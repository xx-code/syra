import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ViewPagerAndroid,
  Image,
  TouchableOpacity
} from "react-native";
import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import SplashScreen from "react-native-splash-screen";
import LinearGradient from "react-native-linear-gradient";

//les points pour ce reperer sur onbording
const DotView = props => {
  const colorSelect = "rgb(38, 70, 83)";
  const colorUnSelect = "rgba(38, 70, 83, 0.6)";
  return (
    <View style={styles.dotView}>
      {props.dots.map((dot, index) => {
        return (
          <Icon
            key={index}
            name="circle"
            color={dot.position === props.num ? colorSelect : colorUnSelect}
            size={6}
            style={{ marginHorizontal: 10 }}
          />
        );
      })}
    </View>
  );
};

//les differents bouttons connexions et deconnexiont
const BtnView = props => {
  return (
    <View style={styles.btnView}>
      {/*Button pour allez a la partie connexion*/}
      <TouchableOpacity onPress={props.goLogin}>
        <View style={styles.btn}>
          <Text style={styles.btnLogin}>Connexion</Text>
        </View>
      </TouchableOpacity>
      {/*boutton pour aller a la partie inscription*/}
      <TouchableOpacity onPress={props.gologup}>
        <View
          style={[styles.btn, { backgroundColor: "#249D8F", marginLeft: 17 }]}
        >
          <Text style={styles.btnLogup}>Inscription</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default class Onboarding extends Component {
  // ajoute les options sur notre navbar pour qu'il ne soit pas afficher
  static get options() {
    return {
      topBar: {
        elevation: 0,
        background: {
          color: "#E76F51"
        }
      }
    };
  }

  // desactive le splashScreen quand la partie intro est monter
  componentDidMount() {
    SplashScreen.hide();
  }

  // fonction pour aller sur la partie connexion
  goLogin = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "syra.login"
      }
    });
  };
  // fonction pour aller sur la partie inscription
  gologup = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "syra.logup"
      }
    });
  };

  render() {
    const dots = [{ position: 0 }, { position: 1 }, { position: 2 }];

    return (
      <LinearGradient colors={["#E76F51", "#E9C46A"]} style={styles.container}>
        <ViewPagerAndroid style={{ flex: 1 }} initialPage={0}>
          <View style={styles.page} key={"0"}>
            <Image
              style={{ width: 77, height: 111 }}
              source={require("../images/logo.png")}
            />
            <Text style={styles.text}>
              Nous vous offrons toutes les informations necéssaires pour
              faciliter vos déplacements au quotidien
            </Text>
            <DotView dots={dots} num={0} />
          </View>
          <View style={styles.page} key={"1"}>
            <Image
              style={{ width: 162.17, height: 119.8 }}
              source={require("../images/onBoarding.png")}
            />
            <Text style={styles.text}>
              Trouver les meilleurs trajets pour vous rendre d'un point A à un
              point B sans perdre de temps
            </Text>
            <DotView dots={dots} num={1} />
          </View>
          <View style={styles.page} key={"2"}>
            <Image
              style={{ width: 212.39, height: 160.2 }}
              source={require("../images/onBoarding2.png")}
            />
            <Text style={styles.text}>
              Partagez les informations sur les prix et trajets que vous
              connaissez pour améliorer l'experience des autres utilisateurs
            </Text>
            <DotView dots={dots} num={2} />
          </View>
        </ViewPagerAndroid>
        <BtnView goLogin={this.goLogin} gologup={this.gologup} />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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
  },
  dotView: {
    flexDirection: "row",
    marginTop: 54
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24
  },
  btn: {
    paddingVertical: 17,
    paddingHorizontal: 47,
    borderWidth: 1,
    borderColor: "#249D8F",
    borderRadius: 4
  },
  btnLogin: {
    color: "#249D8F",
    textAlign: "center",
    fontSize: 16
  },
  btnLogup: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16
  }
});
