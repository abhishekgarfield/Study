import { SafeAreaView } from "react-native";
import { appStyles } from "./src/styles/appStyles";
import AuthScreen from "./src/components/authscreen";

const App = () =>{
  return(
    <SafeAreaView style={appStyles.safeAreaView}>
      <AuthScreen/>
    </SafeAreaView>
  )
}

export default App;
