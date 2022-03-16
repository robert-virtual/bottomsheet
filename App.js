import { NavigationContainer } from "@react-navigation/native";
import { Tabs } from "./routes";
import { StripeProvider } from "@stripe/stripe-react-native";
import { publishablekey } from "./env.json";
export default function App() {
  return (
    <StripeProvider publishableKey={publishablekey}>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </StripeProvider>
  );
}
