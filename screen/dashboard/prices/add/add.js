import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Navigation } from "react-native-navigation";
import { ButtonLight } from "../../../../components/button/button_ui";
import { ModalView2 } from "../../../../components/modal/modal";
import ModalContent from "./modalContent";

export default class Add extends Component {
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
              source={require("../../../../images/target.png")}
              style={styles.img}
            />
            <Text style={styles.text}>
              Ajouter des informations que vous avez sur les itineraires et
              leurs tarifs. Ceci permettra aux autres utilisateurs de mieux se
              deplacer.
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

        <ModalView2
          visible={visibleModal}
          titleModal="Ajouter une itineraire"
          onPressBack={() => {
            this.setState({ visibleModal: false });
          }}
        >
          <ModalContent
            return={() => {
              this.setState({ visibleModal: false });
            }}
          />
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
    width: 70.36,
    height: 46.93,
    marginRight: 20
  },
  text: {
    color: "#ffff",
    width: 250,
    fontSize: 14,
    marginBottom: 25
  }
});
