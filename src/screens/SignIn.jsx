import React from "react";
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Text from "../components/text/text";
import { colors, spacing } from "../themes";
import initAuthentication from "../config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

initAuthentication();
const auth = getAuth();

export default function SignIn({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ alignSelf: "center", marginTop: 15 }}
        source={require("../../assets/empty-state.png")}
      />
      <Text preset="h1" style={{ color: colors.white, alignSelf: "center" }}>
        Never Forget your Notes
      </Text>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="password"
          style={styles.input}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={() => handleSignIn()}>
          <Text preset="h4" style={styles.loginButton}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signUpButtonView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text preset="">Don't have and Account? SignUp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 50,
    borderColor: colors.gray,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  inputView: {
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  loginButton: {
    color: colors.white,
    alignSelf: "center",
    marginTop: spacing[8],
    backgroundColor: colors.green,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  signUpButtonView: {
    flex: 0.7,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
