import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { colors, spacing } from "../themes";
import Text from "../components/text/text";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { showMessage } from "react-native-flash-message";

const noteColors = Object.keys(colors).slice(0, 7);

export default function Create({ navigation, user }) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [noteColor, setNoteColor] = React.useState("");
  const handleCreate = async () => {
    try {
      // create operation of CRUD
      const docRef = await addDoc(collection(db, "notes"), {
        title: title,
        description: description,
        color: noteColor,
        uid: user.uid,
      });
      showMessage({
        message: "note created successfully",
        type: "success",
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View>
        <Image
          style={styles.image}
          source={require("../../assets/image/create-screen.png")}
        />
        <TextInput
          style={styles.input}
          placeholder="Title"
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          placeholder="Description"
          style={styles.input}
          onChangeText={(text) => setDescription(text)}
          multiline={true}
        />
        <View style={{ marginLeft: 15 }}>
          <View>
            <Text
              preset="h4"
              style={{ color: colors.grey, marginVertical: 10 }}
            >
              Select your note color
            </Text>
          </View>
          {noteColors.map((option) => {
            const selected = option === noteColor;
            return (
              <TouchableOpacity
                onPress={() => setNoteColor(option)}
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
                <Text preset="small" style={{ color: "black", fontSize: 12 }}>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
          {/* ---------------submit--------------- */}
          <TouchableOpacity onPress={() => handleCreate()}>
            <Text preset="h4" style={styles.loginButton}>
              Create
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  loginButton: {
    color: colors.white,
    alignSelf: "center",
    marginTop: spacing[8],
    backgroundColor: colors.lightGreen,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  input: {
    height: 50,
    borderColor: colors.grey,
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    marginHorizontal: 15,
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
