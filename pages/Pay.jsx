import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import axios from "axios";
import { useState } from "react";
import { StyleSheet, View, Button, TextInput, Alert } from "react-native";
export function Pay() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { confirmPayment } = useConfirmPayment();
  async function handlePay() {
    try {
      setLoading(true);
      const { data } = await axios.post("/create-payment-intent", {
        productos: [
          { id: 2, cantidad: 2 },
          { id: 6, cantidad: 1 },
        ],
        email,
      });
      const { paymentIntent, error } = await confirmPayment(data.clientSecret, {
        type: "Card",
        billingDetails: {
          name,
          email,
        },
      });
      setLoading(false);
      if (error) {
        Alert.alert("Payment Error", error.message);
        return;
      }
      Alert.alert("Payment completed", "Payment Id:" + paymentIntent.id);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nombre"
        style={{ padding: 15 }}
        underlineColorAndroid="blue"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Correo"
        style={{ padding: 15 }}
        underlineColorAndroid="blue"
        value={email}
        onChangeText={setEmail}
      />
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={{
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
        }}
        style={{
          width: "100%",
          height: 50,
          marginVertical: 30,
        }}
      />
      <Button title="Pay" onPress={handlePay} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
