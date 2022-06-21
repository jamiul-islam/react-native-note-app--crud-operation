import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors, spacing } from "../themes";

export default function Button({ title, onPress, customStyles, textPreset }) {
  return (
    <TouchableOpacity
      style={[styles.loginButton, customStyles]}
      onPress={onPress}
    >
      <Text preset={textPreset} style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    color: colors.black,
    alignSelf: "center",
    marginTop: spacing[8],
    backgroundColor: colors.lightGreen,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
});
