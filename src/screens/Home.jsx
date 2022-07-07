import { View, TouchableHighlight, FlatList } from "react-native";
import React, { useEffect } from "react";
import { colors } from "../themes";
import Text from "../components/text/text";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  collection,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

export default function Home({ navigation, user }) {
  const [notes, setNotes] = React.useState([]);
  // reading note data || reading method of CRUD operation
  useEffect(() => {
    // created a query
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));
    // listening to the query
    const notesListenerSubscription = onSnapshot(q, (QuerySnapshot) => {
      const List = [];
      QuerySnapshot.forEach((doc) => {
        console.log(doc.id);
        List.push({ id: doc.id, ...doc.data() });
      });
      setNotes(List);
    });
    return notesListenerSubscription;
  }, []);

  const renderItem = (i) => {
    const note = i.item;
    return (
      <TouchableHighlight
        style={{
          backgroundColor: colors[i.item.color],
          marginBottom: 15,
          padding: 10,
          borderRadius: 5,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 10 }}>
            <Text
              preset=""
              style={{
                color: colors.black,
                fontSize: 20,
              }}
            >
              {note.title}
            </Text>
            <Text
              preset=""
              style={{
                color: colors.black,
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
            <AntDesign
              style={{ marginVertical: 5 }}
              name="delete"
              size={20}
              color="white"
            />
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  const handleCreateNote = () => {
    navigation.navigate("Create");
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
        <TouchableHighlight onPress={() => handleCreateNote()}>
          <AntDesign name="pluscircle" size={24} color="white" />
        </TouchableHighlight>
      </View>
      <View>
        <FlatList
          data={notes}
          renderItem={(i) => renderItem(i)}
          keyExtractor={(item) => item.title + item.uid}
          contentContainerStyle={{ padding: 15 }}
        />
      </View>
    </View>
  );
}
