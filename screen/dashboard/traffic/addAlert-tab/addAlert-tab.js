import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Alert, Dimensions } from "react-native";
import { Navigation } from "react-native-navigation";
import {
  ButtonMainLight,
  ButtonLight
} from "../../../../components/button/button_ui";
import { ModalAlert, ModalView2 } from "../../../../components/modal/modal";
import MapView from "react-native-maps";
import ModalContent from "./type-alert-modal";
import Geocoder from "react-native-geocoder";
import geolib from 'geolib';
import { coordinateBase } from "../../../../components/utils/static-data";
import firebase from 'react-native-firebase'

const InformationAlert = {
  title: "Postition de l'alert est: ",
  message: "Etes vous sur que c'est la position de l'alert",
  elementTemp: "none",
  btnLeft: "OUI",
  btnRight: "NON"
};

const ContentAlert = props => {
  return (
    <React.Fragment>
      <View style={styles.startContent}>
        <Image
          style={{ width: 80.02, height: 69.61, marginRight: 8 }}
          source={require("../../../../images/felicita.png")}
        />
        <View>
          <Text style={styles.text}>
            Confirmez-vous la localisation de l'alerte ?
          </Text>
          <View style={styles.btnConfirm}>
            <ButtonLight action={props.accept}>OUI</ButtonLight>
            <ButtonLight action={props.decline}>NON</ButtonLight>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
};

const ContentWelcome = props => {
  return (
    <React.Fragment>
      <View style={styles.startContent}>
        <Image
          style={{ width: 80.02, height: 69.61 }}
          source={require("../../../../images/felicita.png")}
        />
        <Text style={styles.text}>
          En ajoutant une alerte sur le traffic routier autour de vous , vous
          nous permettez d'avertir les autres utilisateurs en temps reel et vous
          gagnez des points.
        </Text>
      </View>
      <ButtonLight action={props.action}>COMMENCER</ButtonLight>
    </React.Fragment>
  );
};

const ContentWarring = props => {
  return(
    <React.Fragment>
      <View style={styles.startContent}>
        <Image
          style={{ width: 80.02, height: 69.61 }}
          source={require("../../../../images/felicita.png")}
        />
        <Text style={styles.text}>
          Vous l'avez remarquez aussi bien joué allez confirmez cette alerte pour recevoir des points.
        </Text>
      </View>
      <ButtonLight action={props.action}>CONFIRMER</ButtonLight>
    </React.Fragment>
  );
};

export default class AddAlert extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('alert')
    this.unsubscribe = null;
    this.state = {
      location: coordinateBase,
      address: "none",
      positionSet: false,
      alertInformatiom: false,
      modalAdd: false,
      alerts: [],
      proximite: false,
      alertPosition: null,
    };
    
  }

  componentDidMount(){
    this.unsubscribe = this.ref.orderBy("timestamp", "ASC").onSnapshot(this.getAlert)
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getAlert = (querySnapshot) => {
    this.setState({searchingAlert: true});
    const alerts = [];

    querySnapshot.forEach(doc => {
        const { alertIcon, alertType, location, like, unlike } = doc.data();
        const id = doc.id
        
        let latLng ={
            lat: location.latitude,
            lng: location.longitude
        }

        Geocoder.geocodePosition(latLng).then(res => {
            const newAlert = {
                key :  id,
                alertIcon : alertIcon,
                alertType : alertType,
                location : res[0].formattedAddress,
                locationAddress: res[1].subLocality,
                latLng : latLng,
                unlike : unlike,
                like : like,
            }

            alerts.unshift(newAlert);

            this.setState({alerts: alerts, filertAlerts: alerts, searchingAlert: false})

        })
        
    });
  }

  setPositionLongPress = event => {
    const { coordinate } = event.nativeEvent;
    coordinate.longitudeDelta = 0.0112;
    coordinate.latitudeDelta =
      (0.0112 * Dimensions.get("window").width) /
      Dimensions.get("window").height;
    let latLng = {
      lat: coordinate.latitude,
      lng: coordinate.longitude
    };
    Geocoder.geocodePosition(latLng).then(res => {
      let location;
      location = res[0].formattedAddress;

      this.map.animateToNavigation(
        {
          ...this.state.location,
          longitude: coordinate.longitude,
          latitude: coordinate.latitude
        },
        4,
        45,
        10000
      );

      this.setState({
        location: coordinate,
        positionSet: true,
        alertInformatiom: true,
        address: location
      });
    }).catch(err => {
      Alert.alert(
        "Error",
        "Impossible de trouver votre position veuillez verifier votre connexion internet",
        [
          {
            text: 'ok',
            onPress: () => this.props.return()
          }
        ]
      );
    })
  };

  setMyposition = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const coords = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          latitudeDelta: 0.0112,
          longitudeDelta:
            (0.0112 * Dimensions.get("window").width) /
            Dimensions.get("window").height
        };
        let latLng = {
          lat: coords.latitude,
          lng: coords.longitude
        };
        Geocoder.geocodePosition(latLng).then(res => {
          let location;

          location = res[0].formattedAddress;

          this.map.animateToRegion(
            {
              ...this.state.location,
              longitude: coords.longitude,
              latitude: coords.latitude
            },
            5000
          );

          const { alerts } = this.state;
          let ok;
          let i;
          //verifi si le bougre est approximite de l'emplacement
          for(i = 0; i < alerts.length; i++){
            if(geolib.isPointInCircle({latitude: pos.coords.latitude, longitude: pos.coords.longitude}, 
                {latitude:  alerts[i].latLng.lat, longitude: alerts[i].latLng.lng}, 300)){
              ok = true;
              break;
            }else{
              ok = false;
            }
          }

          this.setState({
            location: coords,
            positionSet: true,
            alertInformatiom: true,
            address: location,
            proximite: ok,
            alertPosition: i
          });

        }).catch(err=> {
          Alert.alert(
            "Error",
            "Impossible de trouver votre position veuillez verifier votre connexion internet"
          );
        });
      },
      () => {
        Alert.alert(
          "Error",
          "Impossible de trouver votre position veuillez verifier votre connexion internet"
        );
      }
    );
  };

  goConfirmer = () =>{
    const Navigation = this.props.navigation;
          Navigation.navigate("alert", {
            alert: this.state.alerts[this.state.alertPosition]
          });
  }

  render() {
    const {
      location,
      positionSet,
      alertInformatiom,
      modalAdd,
      address,
      proximite
    } = this.state;
    let marker = null;
    let contentAction = null;
    if (positionSet) {
      InformationAlert.elementTemp = address;
      marker = <MapView.Marker coordinate={location} />;
    }

    if(proximite){
      contentAction = <ContentWarring action = {this.goConfirmer}/>
    }else{
      contentAction = <ContentAlert
                          accept={() =>
                            this.setState({
                              alertInformatiom: false,
                              positionSet: false,
                              modalAdd: true
                            })
                          }
                          decline={() =>
                            this.setState({
                              alertInformatiom: false,
                              location: coordinateBase,
                              positionSet: false
                            })
                          }
                        />
    }

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {alertInformatiom ? (
            contentAction
          ) : ( 
            <ContentWelcome action={this.setMyposition} />
          )}
        </View>
        <MapView
          style={{ flex: 1 }}
          region={location}
          onLongPress={this.setPositionLongPress}
          ref={ref => {
            this.map = ref;
          }}
        >
          {marker}
        </MapView>
        {/*<ModalAlert
                    visible = {alertInformatiom}
                    onPressBack = {() => this.setState({alertInformatiom : false, location: coordinateBase, positionSet: false})}
                    alert = {InformationAlert}
                    actionLeft = {() => this.setState({alertInformatiom : false, positionSet: false, modalAdd: true})}
                    actionRight = {() => this.setState({alertInformatiom : false, location: coordinateBase, positionSet: false})}
                />*/}
        <ModalView2
          visible={modalAdd}
          onPressBack={() =>
            this.setState({
              modalAdd: false,
              location: coordinateBase,
              positionSet: false
            })
          }
          alert={modalAdd}
          titleModal="Type d'alerte">
          <ModalContent
            locationAlert={location}
            back={() =>
              this.setState({
                modalAdd: false,
                location: coordinateBase,
                positionSet: false
              })
            }
          />
        </ModalView2>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    backgroundColor: "#E76F51",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 29
  },
  startContent: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 25,
    width: 281.97,
    justifyContent: "space-between"
  },
  text: {
    color: "#fff",
    width: 230
  },
  btnConfirm: {
    flex: 1,
    flexDirection: "row",
    marginTop: 14,
    width: 162,
    justifyContent: "space-between"
  }
});
