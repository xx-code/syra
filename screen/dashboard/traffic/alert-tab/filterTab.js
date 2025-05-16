import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  View
} from "react-native";

const ItemTab = props => {
  return (
    <TouchableOpacity onPress={props.change}>
      <Text style={props.active ? styles.itemActive : styles.item}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default class TabFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "none"
    };
  }

  componentDidMount() {
    this.setState({ active: this.props.selectValue });
  }

  changeValue = item => {
    this.setState({ active: item });
    this.props.onValueChange(item);
  };

  render() {
    const { values } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {values.map((item, index) => {
            return (
              <ItemTab
                key={index}
                change={() => this.changeValue(item.value)}
                text={item.label}
                active={item.value === this.state.active ? true : false}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

/*<FlatList 
                style = {styles.container}
                data = {values}
                scrollIndicatorInsets = {false}
                horizontal = {true}
                keyExtractor = {(item, index) => item.value}
                renderItem = { ({item}) => <ItemTab change = { () => this.changeValue(item.value)} text = {item.label}
                                                active = {item.value === this.state.active ? true : false}/>}
                />*/

const styles = StyleSheet.create({
  container: {
    zIndex: 5,
    backgroundColor: "#EAEAEA",
    flexDirection: "row"
  },
  item: {
    color: "#707070",
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    /*paddingHorizontal: 8,
    paddingVertical: 12,
    marginVertical: 6,
    marginRight: 5,
    borderRadius: 5*/
    height: 32,
    opacity: 1,
    borderRadius: 4,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 21,
    paddingRight: 21,
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 17,
    letterSpacing: 0.25
  },
  itemActive: {
    backgroundColor: "#e76f51",
    height: 32,
    opacity: 1,
    borderRadius: 4,
    /*paddingHorizontal: 8,
    paddingVertical: 12,
    marginVertical: 6,
    marginRight: 5,
    borderRadius: 5*/
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 21,
    paddingRight: 21,
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
    color: "white",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 17,
    letterSpacing: 0.25
  }
});
