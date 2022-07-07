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
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { showMessage } from "react-native-flash-message";

const noteColors = Object.keys(colors).slice(0, 7);

export default function Edit({ navigation, route }) {
  const noteItem = route.params.note;
  const [title, setTitle] = React.useState(noteItem.title);
  const [description, setDescription] = React.useState(noteItem.description);
  const [noteColor, setNoteColor] = React.useState(noteItem.color);
  const [loading, setLoading] = React.useState(true);

  const handleEdit = async () => {
    try {
      // create operation of CRUD
      await updateDoc(doc(db, "notes", noteItem.id), {
        title: title,
        description: description,
        color: noteColor,
      });
      setLoading(false);
      showMessage({
        message: "Note updated successfully",
        type: "success",
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
      setLoading(false);
      showMessage({
        message: error.message,
        type: "danger",
      });
    }
  };

  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={require("../../assets/image/edit-screen.png")}
      />
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={(text) => setTitle(text)}
        value={title}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        onChangeText={(text) => setDescription(text)}
        multiline={true}
        value={description}
      />
      <View style={{ marginLeft: 15 }}>
        <View>
          <Text preset="h4" style={{ color: colors.grey, marginVertical: 10 }}>
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
        <TouchableOpacity onPress={() => handleEdit()}>
          <Text preset="h4" style={styles.loginButton}>
            Submit
          </Text>
        </TouchableOpacity>
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
    paddingHorizontal: 15,
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
