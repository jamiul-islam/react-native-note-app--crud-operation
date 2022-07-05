import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Home from "./src/screens/Home";
import SignIn from "./src/screens/SignIn";
import signup from "./src/screens/SignUp";
import Edit from "./src/screens/Edit";
import Create from "./src/screens/Create";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const auth = getAuth();

// custom white theme
const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

const Stack = createNativeStackNavigator();

function App() {
  // sign out
  // useEffect(() => {
  //   signOut(auth);
  // }, []);

  // user authentication
  const [user, setUser] = useState(null);
  useEffect(() => {
    const authSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return authSub;
  }, []);

  // load google fonts
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          "Antonio-Medium": require("./assets/fonts/Antonio-Medium.ttf"),
          "Spartan-Bold": require("./assets/fonts/Spartan-Bold.ttf"),
          "Spartan-Regular": require("./assets/fonts/Spartan-Regular.ttf"),
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.androidSafeArea} onLayout={onLayoutRootView}>
      <NavigationContainer theme={AppTheme}>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                user={user}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Edit"
                user={user}
                component={Edit}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Create"
                user={user}
                component={Create}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUp"
                component={signup}
                options={{ headerShown: true }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
