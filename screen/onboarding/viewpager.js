import React, { Component } from "react";
import { StyleSheet, Text, View, ViewPagerAndroid, Image } from "react-native";

const ViewPager = props => {
  return (
    <ViewPagerAndroid
      style={{ flex: 7 }}
      initialPage={0}
      onPageSelected={props.onPageSelected}
    >
      <View style={styles.page} key={"0"}>
        <Image
          style={{ width: 77, height: 111 }}
          source={require("../../images/logo.png")}
        />
        <Text style={styles.text}>
          Toutes les informations necéssaires pour faciliter vos déplacements au
          quotidien
        </Text>
      </View>
      <View style={styles.page} key={"1"}>
        <Image
          style={{ width: 162.17, height: 119.8 }}
          source={require("../../images/onBoarding.png")}
        />
        <Text style={styles.text}>
          Trouver et partager les itinéraires et tarifs pour se rendre d’un
          point A à un point B selon les différents moyens de transport
        </Text>
      </View>
      <View style={styles.page} key={"2"}>
        <Image
          style={{ width: 212.39, height: 160.2 }}
          source={require("../../images/onBoarding2.png")}
        />
        <Text style={styles.text}>
          Informer et être informé sous forme d’alerte en temps réel du traffic
          routier à savoir les embouteillages, accidents, routes barrées
        </Text>
      </View>
    </ViewPagerAndroid>
  );
};

const styles = StyleSheet.create({
  page: {
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    marginTop: 56,
    marginHorizontal: 43,
    color: "#fff",
    fontSize: 16,
    textAlign: "center"
  }
});

export default ViewPager;
