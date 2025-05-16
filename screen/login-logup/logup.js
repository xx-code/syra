import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { InputText } from "../../components/input-field/simple-input";
import { ButtonBlock } from "../../components/button/button_ui";
import styles from "./login-logup_ui";
import firebase from "react-native-firebase";
import validationInput from "./validation/logup";
import firebaseErrors from "./validation/logup-firebase-errors";
import Loading from "../../components/loading/loading-modal";

export default class Login extends Component {
  static navigationOptions = {
    title: "INSCRTIPTION",
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
    this.state = {
      pseudo: "",
      email: "",
      password: "",
      password2: "",
      loading: false,
      errors: {}
    };
  }

  changeText = (text, state) => {
    this.setState({ [state]: text });
  };

  logup = () => {
    this.setState({ loading: true });
    const { pseudo, email, password, password2 } = this.state;
    const dataInput = {
      pseudo: pseudo,
      email: email,
      password: password,
      password2: password2
    };
    const { isValid, errors } = validationInput(dataInput);

    if(!isValid){
        this.setState({errors: errors, loading: false});
    }else{
        firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(newUser =>{
            firebase.firestore().collection('users').doc(newUser.user.uid).set({
                pseudo: pseudo,
                points: 0
            }).then(done => {
                this.setState({loading: false})
                const Navigation = this.props.navigation
                Navigation.navigate("login");
            })
        })
        .catch(error => {
            this.setState({errors: firebaseErrors(error), loading: false})
        });
    }
  };

  render() {
    const { errors, loading } = this.state;
    return (
      <LinearGradient colors={["#E76F51", "#E9C46A"]} style={styles.container}>
        <Loading active={loading} />
        <ScrollView style={styles.viewlog}>
          <InputText
            style={{ marginBottom: 16 }}
            name="pseudo"
            placeholder="Pseudo"
            onChangeText={this.changeText}
            error={errors.pseudo}
          />

          <InputText
            style={{ marginBottom: 16 }}
            name="email"
            placeholder="Email"
            onChangeText={this.changeText}
            error={errors.pseudo}
          />

          <InputText
            style={{ marginBottom: 16 }}
            name="password"
            placeholder="Mot de passe"
            onChangeText={this.changeText}
            pass={true}
            error={errors.password}
          />

          <InputText
            name="password2"
            placeholder="Confirmez mot de passe"
            onChangeText={this.changeText}
            pass={true}
            error={errors.password2}
          />
          <View style={styles.btnNext}>
            <ButtonBlock action={this.logup}>S'INSCRIRE</ButtonBlock>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}
