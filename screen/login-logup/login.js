import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { InputText } from "../../components/input-field/simple-input";
import {
  ButtonIntroDark,
  ButtonBlock
} from "../../components/button/button_ui";
import styles from "./login-logup_ui";
import firebase from "react-native-firebase";
import validationInput from "./validation/login";
import Loading from "../../components/loading/loading-modal";
import firebaseErrors from "./validation/logup-firebase-errors";

export default class Login extends Component {
  static navigationOptions = {
    title: "CONNEXION",
    headerStyle: {
      backgroundColor: "#E76F51",
      elevation: 0
    },
    headerTintColor: "white",
    headerTitleStyle: {
      color: "white",
      textAlign: "center"
    }
  };

  constructor(props) {
    super(props);
    this.unsubscriber = null;
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {}
    };
  }

  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const Navigation = this.props.navigation;
        Navigation.navigate("dashboard");
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  changeText = (text, state) => {
    this.setState({ [state]: text });
  };

  login = () => {
    this.setState({ loading: true });
    const { email, password } = this.state;
    const dataInput = {
      email: email,
      password: password
    };

    const { isValid, errors } = validationInput(dataInput);

    if (!isValid) {
      this.setState({ errors: errors, loading: false });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({ loading: false });
          const Navigation = this.props.navigation;
          Navigation.navigate("dashboard");
        })
        .catch(error => {
          this.setState({ errors: firebaseErrors(error.code), loading: false });
        });
    }
  };

  render() {
    const { errors, loading } = this.state;
    return (
      <LinearGradient colors={["#E76F51", "#E9C46A"]} style={styles.container}>
        <View style={styles.viewlog}>
          <InputText
            style={{ marginBottom: 16 }}
            name="email"
            placeholder="Email"
            onChangeText={this.changeText}
            type="email-address"
            error={errors.email}
          />
          <InputText
            name="password"
            placeholder="Mot de passe"
            onChangeText={this.changeText}
            pass={true}
            error={errors.password}
          />
          <View style={styles.viewInfo}>
            {/*Ajouter des touchable sans feedback pour gerer ces option*/}
            <Text style={styles.textInfo}>Mot de passe oublié?</Text>
          </View>
          <View style={styles.btnNext}>
            <ButtonBlock action={this.login}>SE CONNECTER</ButtonBlock>
          </View>
        </View>

        <Loading active={loading} />
      </LinearGradient>
    );
  }
}
