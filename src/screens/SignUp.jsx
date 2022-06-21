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

const genderOptions = ["Male", "Female"];

export default function SignUp({ navigation }) {
  const [gender, setGender] = React.useState(null);

  return (
    <View style={styles.container}>
      {/* ---------------heading--------------- */}
      <Text preset="h1" style={{ color: colors.white, alignSelf: "center" }}>
        Never Forget your Notes
      </Text>
      <View style={styles.inputView}>
        {/* ---------------email--------------- */}
        <TextInput placeholder="Email" style={styles.input} />
        {/* ---------------password--------------- */}
        <TextInput
          placeholder="password"
          style={styles.input}
          secureTextEntry
        />
        {/* ---------------full name--------------- */}
        <TextInput placeholder="Full Name" style={styles.input} />
        {/* ---------------age--------------- */}
        <TextInput placeholder="Age" style={styles.input} />
        {/* ---------------male/female--------------- */}
        {genderOptions.map((option) => (
          <TouchableOpacity key={option} style={styles.radioContainer}>
            <View
              style={[styles.outerCircle, selected && styles.selectOuterCircle]}
            >
              <View
                style={[
                  styles.innerCircle,
                  selected && styles.selectInnerCircle,
                ]}
              />
            </View>
            <Text preset="">{option}</Text>
          </TouchableOpacity>
        ))}
        {/* ---------------submit--------------- */}
        <TouchableOpacity>
          <Text preset="h4" style={styles.loginButton}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      {/* ---------------sign In--------------- */}
      <View style={styles.signUpButtonView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text preset="">Already have and Account? SignIn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: spacing[8],
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
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#cfcfcf",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 7.5,
    borderWidth: 1,
    borderColor: "#cfcfcf",
  },
  selectOuterCircle: {
    borderColor: colors.orange,
  },
  selectInnerCircle: {
    backgroundColor: colors.orange,
    borderColor: colors.orange,
  },
});
