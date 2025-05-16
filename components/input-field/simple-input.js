import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";

export class InputTextAutoCorrection extends Component {
  state = {
    showModal: false
  };

  render() {
    return (
      <View style={this.props.style}>
        <TextInput
          style={styles.inputauto}
          ref={ref => (this.input = ref)}
          onChangeText={text => this.props.onChangeText(text, this.props.name)}
          placeholder={this.props.placeholder}
          placeholderTextColor="#fff"
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          value={this.props.value}
          editable={this.props.editable}
          onEndEditing={this.onEnd}
        />
      </View>
    );
  }
}

export const InputTextBackScreen = props => {
  return (
    <View style={props.style}>
      <TextInput
        style={styles.inputauto}
        onChangeText={text => props.onChangeText(text)}
        placeholder={props.placeholder}
        placeholderTextColor="#fff"
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        keyboardType={props.type}
        onEndEditing={props.onEnd}
        value={props.value}
      />
    </View>
  );
};

export const InputText = props => {
  return (
    <View style={props.style}>
      <TextInput
        style={styles.input}
        onChangeText={text => props.onChangeText(text, props.name)}
        placeholder={props.placeholder}
        placeholderTextColor="#fff"
        underlineColorAndroid="#fff"
        autoCapitalize="none"
        keyboardType={props.type}
        secureTextEntry={props.pass ? true : false}
      />
      <Text style={styles.text}>{props.error}</Text>
    </View>
  );
};

export const InputTextLight = props => {
  return (
    <View style={props.style}>
      <TextInput
        style={styles.inputLight}
        onChangeText={text => props.onChangeText(text, props.name)}
        placeholder={props.placeholder}
        underlineColorAndroid="transparent"
      />
      <Text style={styles.text}>{props.error}</Text>
    </View>
  );
};

/*export class InputTextAutoCorrection extends Component{

    constructor(props){
        super(props)
        this.state = {
            visible : "none"
        }
    }
    
    onPressinputauto  = (inputauto) => {
        this.props.autoCorrectPress(inputauto, this.props.name)
        this.setState({visible : "none"})
    }

    filter =  (data) => {
        const values = data;
        const newValues = [];
        const value = this.props.value.toUpperCase();
        for(i = 0; i < values.length; i++){
            if(values[i].name.toUpperCase().indexOf(value) > -1){
                newValues.push(values[i]);
            }
        }
        return newValues;
    }

    render(){
        
        const data = this.filter(this.props.values);
        
        return(
        <View style = {this.props.style}>
            <TextInput style = {styles.inputLight}
                onChangeText = {(text) => this.props.onChangeText(text, this.props.name)}
                placeholder = {this.props.placeholder}
                underlineColorAndroid = "transparent"
                onFocus = {() => this.setState({visible : "flex"})}
                value = {this.props.value}
            />
            <Text style = {styles.text}>{this.props.error}</Text>
        </View>
    )
    }
    
}*/

const styles = StyleSheet.create({
  input: {
    paddingLeft: 20,
    color: "#fff"
  },
  text: {
    fontSize: 12,
    color: "#ed3b38"
  },
  inputLight: {
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingLeft: 16,
    paddingVertical: 15
  },
  fatlist: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginTop: 4,
    zIndex: 400,
    maxHeight: "80%"
  },
  inputauto: {
    backgroundColor: "rgba(38, 70, 83, 0.25)",
    paddingVertical: 9,
    paddingLeft: 15,
    borderRadius: 20,
    color: "#fff"
  },
  textItem: {
    textAlign: "center",
    color: "#264653"
  },
  itemInputAuto: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  item: {
    borderBottomColor: "#707070",
    borderWidth: 1
  }
});
export default InputText;
