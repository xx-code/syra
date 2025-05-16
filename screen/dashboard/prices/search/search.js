import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Navigation } from "react-native-navigation";
import { ButtonLight } from "../../../../components/button/button_ui";
import { ModalView2 } from "../../../../components/modal/modal";
import ModalContent from "./modalContent";
import MapView from "react-native-maps";
import { coordinateBase } from "../../../../components/utils/static-data";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal: false
    };
  }

  render() {
    const { visibleModal } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.contentImg}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../../../images/map.png")}
              style={styles.img}
            />
            <Text style={styles.text}>
              Trouver le tarif et la meilleure itinieraire pour le deplacement
              que vous voulez effectuer quelque soit le moyen de transport.
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <ButtonLight
              action={() => {
                this.setState({ visibleModal: true });
              }}
            >
              COMMENCER
            </ButtonLight>
          </View>
        </View>
        <MapView style={{ flex: 1 }} region={coordinateBase} />
        <ModalView2
          visible={visibleModal}
          titleModal="Rechercher une itineraire"
          onPressBack={() => {
            this.setState({ visibleModal: false });
          }}
        >
          <ModalContent return = {() => this.setState({ visibleModal: false })}/>
        </ModalView2>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEAEA"
  },
  contentImg: {
    backgroundColor: "#E76F51",
    justifyContent: "center",
    paddingBottom: 30,
    paddingTop: 14,
    paddingHorizontal: 30
  },
  img: {
    width: 63.7,
    height: 55.7,
    marginRight: 20
  },
  text: {
    color: "#ffff",
    width: 250,
    fontSize: 14,
    marginBottom: 25
  }
});
