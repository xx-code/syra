import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Navigation}  from 'react-native-navigation';
import { InputTextAutoCorrection } from '../../../../../components/input-field/simple-input';
import { ButtonMainApp } from '../../../../../components/button/button_ui';
import {ElementPicker} from '../../../../../components/input-field/picker';
import {PickerValues} from '../../../../../components/utils/PickerValues';
import Graph from '../../../../../components/utils/graphSearch';
import firebase from 'react-native-firebase';


export default class AddPath extends Component{

    constructor(props){
        super(props)
        this.ref = firebase.firestore().collection('places');
        this.unsubcribe = null;
        this.state = {
            pickerValue: PickerValues[0].value,
            start : "",
            end : "",
            startPos: "",
            endPos: "",
            values : []
        }
    }

    componentDidMount(){
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
        
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    autoCorrectPress = (item, pos) => {
        if(pos === 'start')
            this.setState({startPos : item.key, start : item.name})
        if(pos === 'end')
            this.setState({endPos: item.key, end : item.name})
    }

    onCollectionUpdate = (snapshot) => {
        const values = [];
        snapshot.forEach((doc) => {
            const {name, paths} = doc.data();
            values.push({
                key : doc.id,
                name : name,
                paths : paths
            });
        });

        this.setState({
            values: values
        })
    }

    changeText = (text, state) => {
        this.setState({[state] : text});
    }

    search = () => {
        const { values, startPos, endPos, start } = this.state;
        let valuesDes = [];
        let destinations = [];
        const Navigation = this.props.navigation;

        let graph = new Graph(values.length);
        let i;
        for( i = 0; i < values.length; i++){
            graph.addVertex(values[i].key);
        }

        values.forEach(node => {
            node.paths.forEach(path => {
                graph.addEdge(node.key, path.id);
            })
        })

        graph.dft(startPos, endPos);

        valuesDes = graph.paths.get(0);

        console.log(valuesDes);
        
        for(i = 0; i < valuesDes.length; i++){ 
            let j;
            for(j = 0; j < values.length; j++){
                if(valuesDes[i] === values[j].key){
                    let e;
                    for(e = 0; e < values[j].paths.length; e++){
                        if(valuesDes[i+1] === values[j].paths[e].id){
                            const ele = {
                                des : values[j].paths[e].name,
                                price : values[j].paths[e].price
                            }
                            destinations.push(ele);
                            break;
                        }
                    }
                    break;
                }
            }
        }

        console.log(destinations);

        Navigation.navigate("second", {
            start: start,
            destinations: destinations,
        });
    }

    render(){

        const {pickerValue, values, start, end} = this.state;

        console.log(values);

        return(
            <View style = {styles.container}>
                <Text style = {styles.text}>Merci de remplir le formulaire ci-dessous pour effectuer une recherche</Text>
                <View style = {styles.contentInput}>
                    <InputTextAutoCorrection style = {styles.input} value = {start} name = "start" placeholder = "Départ" 
                        onChangeText = {this.changeText}  values = {values} autoCorrectPress = {this.autoCorrectPress}/>
                    <InputTextAutoCorrection style = {styles.input} value = {end} name = "end" placeholder = "Destination" 
                        onChangeText = {this.changeText}  values = {values} autoCorrectPress = {this.autoCorrectPress}/>
                    <Picker style = {{marginTop: 20, marginBottom: 20}} selectValue = {pickerValue} values = {PickerValues} 
                        onValueChange = {(itemValue, itemIdex) => this.setState({pickerValue: itemValue})}/>
                    <ButtonMainApp title = "Enregistrer" action = {this.search}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#EAEAEA"
    },
    text: {
        marginTop: 32,
        color: "#264653",
        textAlign: "center"
    },
    contentInput:{
        marginHorizontal: 16
    },
    input:{
        marginTop: 20,
    }
})