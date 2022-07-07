import {
  View,
  TouchableHighlight,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import { colors, spacing } from "../themes";
import Text from "../components/text/text";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { getAuth, signOut } from "firebase/auth";
import { async } from "@firebase/util";

const auth = getAuth();

export default function Home({ navigation, user }) {
  const [notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  // reading note data || reading method of CRUD operation
  useEffect(() => {
    // created a query
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));
    // listening to the query
    const notesListenerSubscription = onSnapshot(q, (QuerySnapshot) => {
      const List = [];
      QuerySnapshot.forEach((doc) => {
        List.push({ id: doc.id, ...doc.data() });
      });
      setNotes(List);
      setLoading(false);
    });
    return notesListenerSubscription;
  }, []);

  const renderItem = (i) => {
    const note = i.item;

    // deleting a data || D method of CRUD Operation
    const handleDelete = async () => {
      const deleteNote = async () => await deleteDoc(doc(db, "notes", note.id));
      Alert.alert(
        "Delete? really? :)",
        "once you delete, there's no coming back -_-",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "Delete", onPress: () => deleteNote() },
        ]
      );
    };

    // notes screen
    return (
      <ScrollView>
        <TouchableHighlight
          style={{
            backgroundColor: colors[i.item.color],
            marginBottom: 15,
            padding: 10,
            borderRadius: 5,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flex: 10 }}>
              <Text
                preset=""
                style={{
                  color: colors.white,
                  fontSize: 20,
                }}
              >
                {note.title}
              </Text>
              <Text
                preset=""
                style={{
                  color: colors.white,
                  fontSize: 14,
                }}
              >
                {note.description}
              </Text>
            </View>
            {/* buttons */}
            <View style={{ marginLeft: 15, flex: 1 }}>
              <TouchableHighlight
                onPress={() => {
                  navigation.navigate("Edit", { note });
                }}
              >
                <Feather
                  style={{ marginVertical: 5 }}
                  name="edit"
                  size={20}
                  color="white"
                />
              </TouchableHighlight>
              <TouchableHighlight onPress={() => handleDelete()}>
                <AntDesign
                  style={{ marginVertical: 5 }}
                  name="delete"
                  size={20}
                  color="white"
                />
              </TouchableHighlight>
            </View>
          </View>
        </TouchableHighlight>
      </ScrollView>
    );
  };

  const handleCreateNote = () => {
    navigation.navigate("Create");
  };

  // loading animation
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  // sign out button
  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <View>
      <View
        style={{
          backgroundColor: colors.green,
          padding: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <Text preset="h1">My Notes</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableHighlight onPress={() => handleCreateNote()}>
            <AntDesign name="pluscircle" size={24} color="white" />
          </TouchableHighlight>
          <TouchableHighlight
            style={{ marginLeft: 15 }}
            onPress={() => handleSignOut()}
          >
            <Text preset="small">Sign Out</Text>
          </TouchableHighlight>
        </View>
      </View>
      {notes.length > 0 ? (
        <View>
          <FlatList
            data={notes}
            renderItem={(i) => renderItem(i)}
            keyExtractor={(item) => item.title + item.uid}
            contentContainerStyle={{ padding: 15 }}
          />
        </View>
      ) : (
        <View style={styles.noteContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/image/note-image.png")}
          />
          <Text preset="h2" style={styles.noteTextBottom}>
            you don't have any notes
          </Text>
          <Text preset="small" style={styles.noteTextBottom}>
            click the plus button to create one
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  noteContainer: {
    alignItems: "center",
  },
  image: {
    width: 400,
    height: 400,
    alignSelf: "center",
    marginBottom: spacing[6],
  },
  noteTextBottom: {
    color: colors.black,
    marginTop: 10,
  },
});
