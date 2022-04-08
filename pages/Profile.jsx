import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { ButtomSheet } from "../components";

export function Profile({ navigation }) {
  const [visible, setVisible] = useState(true);
  return (
    <View style={styles.container}>
      <ButtomSheet visible={visible} height={300} draggable={false}>
        <TouchableOpacity
          style={{ backgroundColor: "#fff", padding: 25, borderRadius: 15 }}
          onPress={() => {
            setVisible(false);
          }}
        >
          <Text>Home</Text>
        </TouchableOpacity>
      </ButtomSheet>
      <Text>Profile</Text>
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <Text>show</Text>
      </TouchableOpacity>
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
