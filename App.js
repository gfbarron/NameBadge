import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Animated, StyleSheet, Text, View, SafeAreaView } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { Icon } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";

/**
 * NameBadge is a functional component that can
 * be re-used.
 */
function NameBadge(props) {
  // EXTENSION: add animation to ICON.
  const animatedValue = new Animated.Value(-5);

  const interpolateValue = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000, // dance pattern
        useNativeDriver: true, // Required for transform animations
      }),
      {
        iterations: 3,
        resetBeforeIteration: false,
      }
    ).start();
  }, [animatedValue]);
  // EXTENSION: add animation to ICON.

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Hello</Text>
      <Text style={styles.subtitleText}>My Name is</Text>
      <View style={styles.whiteContainer}>
        <View style={styles.nameContainer}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.nameText}>
            {props.name}
          </Text>
        </View>
        {/* animate the icon for better appeal */}
        <Animated.View
          style={[
            styles.animatedIcon,
            { transform: [{ rotate: interpolateValue }] },
          ]}
        >
          <Icon
            name="plancast"
            type="zocial"
            color="black"
            size={RFPercentage(7)}
          />
        </Animated.View>
        {/* END: animate the icon for better appeal */}
        <View style={styles.pronounsContainer}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={styles.pronounsText}
          >
            ({props.pronouns})
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function App() {

  // lock orientation to landscape as instructed.
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);


  return (
    // wrap in safe area view
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* create NameBadge component */}
        <NameBadge name="Gerry" pronouns="he/him"/>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

// styles for app elements
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: RFPercentage(15), // use RFP library for responsive size
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  subtitleText: {
    fontSize: RFPercentage(5),
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
    marginBottom: RFPercentage(2),
    textAlign: "center",
  },
  whiteContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    width: "85%",
    height: "55%",
    marginBottom: RFPercentage(2),
    borderRadius: RFPercentage(3),
  },
  nameContainer: {
    flex: 1,
    justifyContent: "center",
    borderRadius: RFPercentage(3),
    paddingRight: RFPercentage(2),
  },
  nameText: {
    fontSize: RFPercentage(7),
    fontWeight: "bold",
    textAlign: "right",
    borderRadius: RFPercentage(3),
  },
  pronounsContainer: {
    flex: 1,
    justifyContent: "center",
    borderRadius: RFPercentage(3),
    paddingLeft: RFPercentage(2),
  },
  pronounsText: {
    fontSize: RFPercentage(7),
    fontWeight: "bold",
    textAlign: "left",
  },
  animatedIcon: {
    alignContent: "center",
    justifyContent: "center",
  },
});
