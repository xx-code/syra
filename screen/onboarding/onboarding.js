import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  ButtonIntroLight,
  ButtonIntroDark,
  ButtonPrimary,
  ButtonSecondary
} from "../../components/button/button_ui";
import ViewPager from "./viewpager";
import DotPreView from "./dot-preview";
import firebase from "react-native-firebase";

export default class Onboarding extends Component {
  // ajoute les options sur notre navbar pour qu'il ne soit pas afficher
  static navigationOptions = {
    headerTransparent: true
  };

  constructor(props) {
    super(props);
    this.state = {
      pageSelected: 0
    };
  }

  selectPage = event => {
    this.setState({ pageSelect: event.nativeEvent.position });
  };

  // fonction pour aller sur la partie connexion
  goLogin = () => {
    const Navigation = this.props.navigation;
    Navigation.navigate("login");
  };
  // fonction pour aller sur la partie inscription
  gologup = () => {
    const Navigation = this.props.navigation;
    Navigation.navigate("logup");
  };

  render() {
    const dots = [{ position: 0 }, { position: 1 }, { position: 2 }];

    return (
      <LinearGradient colors={["#E76F51", "#E9C46A"]} style={styles.container}>
        <ViewPager onPageSelected={this.selectPage} />
        <DotPreView
          dots={dots}
          state={this.state.pageSelect}
          style={styles.dotS}
        />
        <View style={styles.btnView}>
          {/*<ButtonIntroLight
            action={this.goLogin}
            title={"Connexion"}
            style={{ marginRight: 17 }}
          />
         <ButtonIntroDark action={this.gologup} title={"Inscription"} />
         <ButtonPrimary />*/}

          <ButtonSecondary action={this.goLogin}>CONNEXION</ButtonSecondary>
          <ButtonPrimary action={this.gologup}>INSCRIPTION</ButtonPrimary>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btnView: {
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 27,
    paddingLeft: 21,
    paddingRight: 21
  }
});
