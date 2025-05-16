import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet, View } from "react-native";

const DotPreView = props => {
  const colorSelect = "rgb(38, 70, 83)";
  const colorUnSelect = "rgba(38, 70, 83, 0.6)";
  return (
    <View style={styles.dotView}>
      {props.dots.map((dot, index) => {
        return (
          <Icon
            key={index}
            name="circle"
            color={dot.position == props.state ? colorSelect : colorUnSelect}
            size={dot.position == props.state ? 8 : 6}
            style={{ marginHorizontal: 10 }}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dotView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default DotPreView;
