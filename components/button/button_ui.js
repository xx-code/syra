import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const ButtonPrimary = props => {
  const { btnStyle, txtStyle } = styles;
  return (
    <TouchableOpacity onPress={props.action} style={btnStyle}>
      <Text style={txtStyle}>{props.children}</Text>
    </TouchableOpacity>
  );
};
export const ButtonSecondary = props => {
  const { btnStyle2, txtStyle2 } = styles;
  return (
    <TouchableOpacity onPress={props.action} style={btnStyle2}>
      <Text style={txtStyle2}>{props.children}</Text>
    </TouchableOpacity>
  );
};
export const ButtonBlock = props => {
  const { btnBlock, txtStyle } = styles;
  return (
    <TouchableOpacity onPress={props.action} style={btnBlock}>
      <Text style={txtStyle}>{props.children}</Text>
    </TouchableOpacity>
  );
};
export const ButtonLight = props => {
  const { btnLight, txtLight } = styles;
  return (
    <TouchableOpacity onPress={props.action} style={btnLight}>
      <Text style={txtLight}>{props.children}</Text>
    </TouchableOpacity>
  );
};
export const ButtonOrange = props => {
  const { btnOrange, txtWhite } = styles;
  return (
    <TouchableOpacity onPress={props.action} style={btnOrange}>
      <Text style={txtWhite}>{props.children}</Text>
    </TouchableOpacity>
  );
};

export const ButtonIntroLight = props => {
  return (
    <TouchableOpacity onPress={props.action}>
      <View style={[styles.btn, props.style]}>
        <Text style={styles.textbtnLight}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const ButtonIntroDark = props => {
  return (
    <TouchableOpacity onPress={props.action}>
      <View style={[styles.btn, { backgroundColor: "#249D8F" }, props.style]}>
        <Text style={styles.textbtnDark}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const ButtonMainApp = props => {
  return (
    <TouchableOpacity onPress={props.action}>
      <View style={[styles.btnMain, props.style]}>
        <Text style={styles.textbtnDark}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const ButtonAlert = props => {
  return (
    <TouchableOpacity onPress={props.action}>
      <View style={[styles.btnAlert, props.style]}>
        <Text style={styles.textbtnDark}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const ButtonMainLight = props => {
  return (
    <TouchableOpacity onPress={props.action}>
      <View style={[styles.btnMainLight, props.style]}>
        <Text style={styles.textbtnMainLight}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    height: 36,
    width: 150,
    borderRadius: 4,
    backgroundColor: "#2a9d8f",
    shadowColor: "#33000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 3
    //shadowRadius: 3
  },
  btnBlock: {
    height: 36,
    borderRadius: 4,
    backgroundColor: "#2a9d8f",
    shadowColor: "#33000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 3
  },
  btnOrange: {
    height: 36,
    borderRadius: 4,
    backgroundColor: "#E76F51",
    shadowColor: "#33000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 3
  },
  txtWhite: {
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 17,
    letterSpacing: 1.25,
    paddingTop: 10,
    paddingBottom: 9,
    alignSelf: "center",
    color: "white"
  },
  btnLight: {
    height: 36,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    shadowColor: "#33000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 3,
    paddingLeft: 23.2,
    paddingRight: 23.2
  },
  txtLight: {
    fontSize: 12,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 15,
    letterSpacing: 1.07,
    color: "#e76f51",
    paddingTop: 11,
    paddingBottom: 10
  },
  btnStyle2: {
    height: 36,
    width: 150,
    borderRadius: 4,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#2a9d8f",
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 0.1,
    elevation: 3
  },
  txtStyle: {
    alignSelf: "center",
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 17,
    letterSpacing: 1.25,
    color: "#ffffff",
    paddingTop: 10,
    paddingBottom: 9
  },
  txtStyle2: {
    alignSelf: "center",
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 17,
    letterSpacing: 1.25,
    color: "#2a9d8f",
    paddingTop: 10,
    paddingBottom: 10
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 47,
    borderWidth: 1,
    borderColor: "#249D8F",
    borderRadius: 4
  },
  textbtnLight: {
    color: "#249D8F",
    textAlign: "center",
    fontSize: 16,
    textTransform: "uppercase"
  },
  textbtnDark: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    textTransform: "uppercase"
  },
  textbtnMainLight: {
    color: "#E76F51",
    textAlign: "center",
    fontSize: 14,
    textTransform: "uppercase"
  },
  btnMain: {
    paddingVertical: 8,
    paddingHorizontal: 47,
    borderWidth: 1,
    borderColor: "#E76F51",
    borderRadius: 4,
    backgroundColor: "#E76F51"
  },
  btnMainLight: {
    paddingVertical: 10,
    paddingHorizontal: 47,
    borderRadius: 4,
    backgroundColor: "#ffff"
  },
  btnAlert: {
    paddingVertical: 10,
    paddingHorizontal: 45,
    borderRadius: 8,
    backgroundColor: "#E76F51"
  }
});
