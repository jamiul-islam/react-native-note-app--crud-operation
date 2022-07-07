import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Text from "../components/text/text";
import { colors, spacing } from "../themes";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.detailsView}>
          <Animatable.View animation={"shake"} delay={0}>
            <Image
              style={styles.image}
              source={require("../../assets/image/profile-img.png")}
            />
          </Animatable.View>
          <Animatable.View animation={"bounce"} delay={500}>
            <Text preset="h1" style={styles.name}>
              welcome to Jamiul's personal note
            </Text>
          </Animatable.View>
          <Animatable.View animation={"tada"} delay={1000} duration={1500}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text style={styles.nextButton} preset="h1">
                Next
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: "center",
    marginBottom: 25,
  },
  detailsView: {
    marginTop: spacing[9],
    marginHorizontal: spacing[6],
  },
  name: {
    textAlign: "center",
    textTransform: "uppercase",
    color: colors.black,
  },
  nextButton: {
    marginTop: spacing[6],
    textAlign: "center",
    backgroundColor: colors.green,
    width: 200,
    alignSelf: "center",
  },
});
