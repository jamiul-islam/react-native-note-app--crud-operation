import React from "react";
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import Text from "../components/text/text";
import { colors, spacing } from "../themes";

export default function SignIn({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={{ alignSelf: "center" }}
        source={require("../../assets/empty-state.png")}
      />
      <Text preset="h1" style={{ color: colors.white, alignSelf: "center" }}>
        Never Forget your Notes
      </Text>
      <View style={styles.inputView}>
        <TextInput placeholder="Email" style={styles.input} />
        <TextInput
          placeholder="password"
          style={styles.input}
          secureTextEntry
        />
        <TouchableOpacity>
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
    borderColor: colors.white,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  inputView: {
    marginTop: spacing[8],
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  loginButton: {
    color: colors.black,
    alignSelf: "center",
    marginTop: spacing[8],
    backgroundColor: colors.lightGreen,
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
