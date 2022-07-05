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
import initAuthentication from "../config/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  onSnapshot,
  query,
  where,
} from "@firebase/firestore";
import { db } from "../config/firebase";

const genderOptions = ["Male", "Female"];

initAuthentication();
const auth = getAuth();

export default function SignUp({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [age, setAge] = React.useState("");
  const [name, setName] = React.useState("");
  const [gender, setGender] = React.useState(null);

  const handleSignUp = async () => {
    try {
      // 1. create user with email and password
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(result.user);

      // 2. add user to fireStore database
      await addDoc(collection(db, "users"), {
        name: name,
        email: email,
        age: age,
        gender: gender,
        uid: result.user.uid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* ---------------heading--------------- */}
      <Text preset="h1" style={{ color: colors.white, alignSelf: "center" }}>
        Never Forget your Notes
      </Text>
      <View style={styles.inputView}>
        {/* ---------------email--------------- */}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />
        {/* ---------------password--------------- */}
        <TextInput
          onChangeText={(text) => setPassword(text)}
          placeholder="password"
          style={styles.input}
          secureTextEntry
        />
        {/* ---------------full name--------------- */}
        <TextInput
          onChangeText={(text) => setName(text)}
          placeholder="Full Name"
          style={styles.input}
        />
        {/* ---------------age--------------- */}
        <TextInput
          onChangeText={(text) => setAge(text)}
          placeholder="Age"
          style={styles.input}
        />
        {/* ---------------male/female--------------- */}
        <View>
          <Text preset="small;" style={{ color: "black", marginVertical: 10 }}>
            Select Gender
          </Text>
        </View>
        {genderOptions.map((option) => {
          const selected = option === gender;
          return (
            <TouchableOpacity
              onPress={() => setGender(option)}
              key={option}
              style={styles.radioContainer}
            >
              <View
                style={[
                  styles.outerCircle,
                  selected && styles.selectOuterCircle,
                ]}
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
          );
        })}
        {/* ---------------submit--------------- */}
        <TouchableOpacity onPress={() => handleSignUp()}>
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
