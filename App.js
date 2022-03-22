import { NavigationContainer } from "@react-navigation/native";
import { Tabs } from "./routes";
import { StripeProvider } from "@stripe/stripe-react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import axios from "axios";
import { useEffect, useState } from "react";
axios.defaults.baseURL = "https://ferreteria-movil.herokuapp.com";

export default function App() {
  const [publishableKey, setPublishableKey] = useState("");
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/config");
      setPublishableKey(data.publishableKey);
      console.log(data);
    })();
  }, []);

  return (
    <NavigationContainer>
      <StripeProvider publishableKey={publishableKey}>
        <SafeAreaProvider>
          <Tabs />
        </SafeAreaProvider>
      </StripeProvider>
    </NavigationContainer>
  );
}
