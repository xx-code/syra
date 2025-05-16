import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert
} from "react-native";
import { Navigation } from "react-native-navigation";
import {
  InputTextBackScreen,
  InputTextAutoCorrection
} from "../../../../components/input-field/simple-input";
import {
  ButtonMainApp,
  ButtonMainLight,
  ButtonOrange
} from "../../../../components/button/button_ui";
import { ElementPickerBackScreen } from "../../../../components/input-field/picker";
import { PickerValues } from "../../../../components/utils/PickerValues";
import firebase from "react-native-firebase";
import geocoder from "react-native-geocoder";
import Icon from "react-native-vector-icons/MaterialIcons";
import RNGooglePlace from "react-native-google-places";
import HideView from "../../../../components/utils/HideView";
import isEmpty from "../../../../components/utils/is-empty";
import Graph from "../../../../components/utils/graphSearch";
import ModalLoading from "../../../../components/loading/loading-modal";
import {
  initalRefactor,
  refactor,
  verifyPathsThere
} from "../../../../components/utils/functionUtils";

const ItemAutoCorrection = props => {
  return (
    <TouchableOpacity style={styles.item} onPress={props.goAhead}>
      <Icon name="place" size={24} color="#707070" />
      <View style={styles.textItem}>
        <Text>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const DestinationShow = props => {
  return (
    <View style={styles.desContent}>
      <View>
        <Text style={styles.start}>{props.start}</Text>
        <Text style={styles.end}>{props.end}</Text>
      </View>
      <Text style={styles.endPrice}>{props.price} FCFA</Text>
    </View>
  );
};


export default class AddPath extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("places");
    this.unsubscribe = null;
    this.state = {
      start: "",
      end: "",
      searchValues: [],
      displaySearch: false,
      loadingSearch: false,
      places: [],
      results: [],
      loading: false
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.getPlaces);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getPlaces = querySnapshot => {
    const places = [];

    querySnapshot.forEach(doc => {
      const { paths } = doc.data();
      const id = doc.id;

      let value = {
        place: id,
        paths: paths
      };

      places.push(value);
    });

    this.setState({ places: places });
  };

  onChangeText = async (text, name) => {
    this.setState({ loadingSearch: true });
    if (name === "start") {
      this.setState({ start: text });
    } else {
      this.setState({ end: text });
    }
    let res = await RNGooglePlace.getAutocompletePredictions(text, {
      country: "CI"
    }).catch( err => {
      Alert.alert(
        "Error!",
        "Veillez verifier votre connexion internet avant de faire cette operation",
        [
            {
                text: 'ok',
                onPress: () => this.props.return()
            }
        ],
        { cancelable: false });
        this.setState({ loadingSearch: false });
    });
    let array = [];
    let i = 0;
    res.forEach(item => {
      let value = {};
      value.text = item.fullText;
      value.key = `${i}`;
      value.name = name;
      array.push(value);
      i++;
    });
    this.setState({ searchValues: array, loadingSearch: false });
  };

  onChangePriceText = text => {
    this.setState({ price: text });
  };

  onClickItem = (name, item) => {
    if (name === "start") {
      this.setState({ displaySearch: true, searchValues: [], start: item });
    }

    if (name === "end") {
      this.setState({ searchValues: [], end: item });
    }
  };

  search = () => {
    this.setState({ loading: true });
    const { start, end, places } = this.state;
    let resultat = [];
    let destinations = [{ place: start, price: "0" }];
    let desShow = [];
    let graph = new Graph(places.length);
    let i;
    for (i = 0; i < places.length; i++) {
      graph.addVertex(places[i].place);
    }

    places.forEach(place => {
      place.paths.forEach(path => {
        graph.addEdge(place.place, path.place);
      });
    });

    graph.dft(refactor(start), refactor(end));

    resultat = graph.paths.get(0);

    if (graph.paths.size <= 0) {
      this.setState({ loading: false });
    } else {
      for (i = 0; i < resultat.length; i++) {
        const { isThere, pathsThere } = verifyPathsThere(places, resultat[i]);
        if (isThere) {
          let j;
          for (j = 0; j < pathsThere.length; j++) {
            if (resultat[i + 1] === pathsThere[j].place) {
              const add = {};
              add.place = pathsThere[j].place;
              add.price = pathsThere[j].price;
              destinations.push(add);
            }
          }
        }
      }

      for (i = 0; i < destinations.length; i++) {
        let add = {};
        if (i < destinations.length - 1) {
          add.price = destinations[i + 1].price;
          add.end = initalRefactor(destinations[i + 1].place);
        }

        if (i === 0) {
          add.start = destinations[i].place;
        } else {
          add.start = initalRefactor(destinations[i].place);
        }

        desShow.push(add);
      }
      desShow.pop();

      this.setState({ results: desShow, loading: false });
    }
  };

  render() {
    const {
      searchValues,
      displaySearch,
      results,
      loadingSearch,
      start,
      end,
      editable,
      loading
    } = this.state;

    return (
      <View style={styles.container}>
        <View>
          <View style={styles.contentInput}>
            <View style={{ margin: 0 }}>
              <InputTextAutoCorrection
                style={[styles.input, { marginBottom: 20 }]}
                value={start}
                name="start"
                placeholder="Départ"
                onChangeText={this.onChangeText}
                dataSearch={searchValues}
                editable={editable}
              />
            </View>

            <HideView hide={displaySearch}>
              <InputTextAutoCorrection
                style={[styles.input, { marginBottom: 20 }]}
                value={end}
                name="end"
                placeholder="Destination"
                onChangeText={this.onChangeText}
                dataSearch={searchValues}
              />
            </HideView>
          </View>
          {!loadingSearch ? (
            <View>
              <FlatList
                data={searchValues}
                keyExtractor={(item, index) => item.key}
                renderItem={({ item }) => (
                  <ItemAutoCorrection
                    text={item.text}
                    goAhead={() => this.onClickItem(item.name, item.text)}
                  />
                )}
              />
            </View>
          ) : (
            <View>
              <ActivityIndicator size="large" color="#E76F51" />
            </View>
          )}
          <View>
            <View
              style={[
                styles.resultText,
                { display: results.length > 0 ? "flex" : "none" }
              ]}
            >
              <Text style={{ color: "#264653" }}>Résultat</Text>
            </View>
            <ScrollView>
              {results.map((item, index) => {
                return (
                  <DestinationShow
                    key={index}
                    start={item.start}
                    end={item.end}
                    price={item.price}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
        <View
          style={[
            styles.btn,
            { display: results.length <= 0 ? "flex" : "none" }
          ]}
        >
          <ButtonOrange action={this.search}>CHERCHER</ButtonOrange>
        </View>
        <ModalLoading action={loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEAEA"
  },
  text: {
    marginTop: 32,
    color: "#264653",
    textAlign: "center"
  },
  contentInput: {
    backgroundColor: "#E76F51"
  },
  input: {
    marginHorizontal: 16,
    display: "flex"
  },
  btn: {
    marginHorizontal: 16,
    marginBottom: 18,
    marginTop: 10
  },
  item: {
    flexDirection: "row",
    paddingHorizontal: 17,
    paddingVertical: 18,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#E3E3E3"
  },
  textItem: {},
  desContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#E3E3E3",
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between"
  },
  resultText: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: "#fff"
  },
  start: {
    fontSize: 14,
    color: "#264653",
    width: 220
  },
  end: {
    width: 220,
    fontSize: 12,
    color: "rgba(0, 0, 0, 0.6)"
  },
  endPrice: {
    fontSize: 12,
    color: "rgba(0, 0, 0, 0.6)"
  },
  btnAddMore: {
    padding: 15,
    backgroundColor: "#fff"
  },
  btnAddMoreText: {
    color: "#E76F51"
  }
});
