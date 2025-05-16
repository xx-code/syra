import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, ScrollView, Alert} from 'react-native';
import {Navigation}  from 'react-native-navigation';
import { InputTextBackScreen, InputTextAutoCorrection } from '../../../../components/input-field/simple-input';
import { ButtonMainApp, ButtonMainLight } from '../../../../components/button/button_ui';
import {ElementPickerBackScreen} from '../../../../components/input-field/picker';
import {PickerValues} from '../../../../components/utils/PickerValues';
import firebase from 'react-native-firebase';
import geocoder from 'react-native-geocoder';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNGooglePlace from 'react-native-google-places';
import HideView from '../../../../components/utils/HideView';
import isEmpty from '../../../../components/utils/is-empty';
import ModalLoading from '../../../../components/loading/loading-modal';
import {refactor, verifyPathsThere} from '../../../../components/utils/functionUtils';

const ItemAutoCorrection = (props) => {
    return(
        <TouchableOpacity style = {styles.item} onPress = {props.goAhead} >
            <Icon name = "place" size = {24} color = "#707070"/>
            <View style = {styles.textItem}>
                <Text>{props.text}</Text>
            </View>
            
        </TouchableOpacity>
    )
}

const DestinationAdds = (props) => {
    return(
        <View style = {styles.desContent}>
            <View>
                <Text style = {styles.start}>{props.start}</Text>
                <Text style = {styles.end}>{props.end}</Text>
            </View>
            <Text style = {styles.endPrice}>{props.price} FCFA</Text>
        </View>
    )
}


export default class AddPath extends Component{

    constructor(props){
        super(props)
        this.ref = firebase.firestore().collection('places');
        this.unsubscribe = null;
        this.state = {
            pickerValue: PickerValues[0],
            start : "",
            end : "",
            price : "0",
            searchValues : [],
            display1: false,
            display2: false,
            loadingSearch : false,
            paths : [],
            places : [],
            editable : true,
            loading: false
        }
    }

    componentDidMount(){
        this.unsubscribe = this.ref.onSnapshot(this.getPlaces);
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    getPlaces = (querySnapshot) => {

        const places = [];

        querySnapshot.forEach(doc => {
            const { paths } = doc.data();
            const id = doc.id

            let value = {
                place : id,
                paths : paths
            }

            places.push(value);
        })

        this.setState({places: places})
    }


    onChangeText = async (text, name) => {
        this.setState({loadingSearch : true})
        if(name === "start"){
            this.setState({start : text})
        }else{
            this.setState({end : text})
        }       
        let res = await RNGooglePlace.getAutocompletePredictions(text, {country: 'CI'})
        .catch(err => {
            Alert.alert(
                "Alert",
                "Le chemin que vous voulez rechercher n'a pas été ajouter par nos utilistateur veuillez ajouter une demande",
                [
                    {
                        text: 'ok',
                        onPress: () => this.props.return()
                    },
                ],
                { cancelable: false }
              );
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
        })
        this.setState({searchValues : array, loadingSearch: false});
        
    }
    onChangePriceText = (text) => {
        this.setState({price : text})
    }

    onClickItem = (name, item) => {
        if(name === "start"){
            this.setState({display1 : true, searchValues : [], start : item})
        }        
        
        if(name == "end"){
            this.setState({display2 : true, searchValues : [], end : item})
        }
    }
    
    endAddPath = () => {
        const arr = this.state.paths;
        let add = {};

        add.price = this.state.price;
        if(arr.length <= 0){
            add.start = this.state.start
        }else{
            add.start = arr[arr.length - 1].end
        }
        add.end = this.state.end;
        arr.push(add)

        this.setState({paths : arr})
    }

    addNewPath = () => {
        this.setState({
            end: "",
            pickerValue: PickerValues[0],
            price : "0",
            display1: true,
            display2: false,
            editable: false
        })
    }

    sendValueUtil = (places, paths) => {
        for(i = 0; i < paths.length; i++){
            const {isThere, pathsThere} = verifyPathsThere(places, refactor(paths[i].end));
            if(isThere){
                const tablePath = [{price: paths[i].price, place: refactor(paths[i].start)}]
                if(!isEmpty(paths[i+1])){
                    tablePath.push({price: paths[i+1].price, place: refactor(paths[i+1].end)})
                }
                this.ref.doc(refactor(paths[i].end)).update({
                    paths : pathsThere.concat(tablePath)
                }).then(res =>{
                    //this.setState({loading: false});
                    this.props.return();
                });
            }else{
                const tablePath = [{price: paths[i].price, place: refactor(paths[i].start)}]
                if(!isEmpty(paths[i+1])){
                    tablePath.push({price: paths[i+1].price, place: refactor(paths[i+1].end)})
                }
                this.ref.doc(refactor(paths[i].end)).set({paths : tablePath})
                .then(res =>{
                    //this.setState({loading: false});
                    this.props.return();
                });
            }
        };
    }

    sendValue = () => {
        const { start, paths, places } = this.state;

        if(!isEmpty(start) && paths.length > 0){
            this.setState({loading: true});
            
            const array = [];

            paths.forEach(path => {
                let value = {};
                value.price = path.price;
                value.place = refactor(path.end);
                array.push(value);
            })

            const {isThere, pathsThere} = verifyPathsThere(places, refactor(start));
            let i;

            if(isThere){
                this.ref.doc(refactor(start)).update({
                    paths : pathsThere.concat(array[0])
                }).then( done => {
                    this.sendValueUtil(places, paths);
                });
            }else{
                this.ref.doc(refactor(start)).set({
                    paths : [array[0]]
                }).then( done => {
                    this.sendValueUtil(places, paths);
                });
            }
        }

    }
    
    render(){

        const {pickerValue, searchValues, display1 , display2, loading,
                loadingSearch, start, end, paths, price, editable} = this.state;

        return(
            <View style = {styles.container}>
                <View >
                    <View style = {styles.contentInput}>

                        <View style = {{margin: 0}}>
                            <InputTextAutoCorrection style = {[styles.input, {marginBottom: 20}]} value = {start} name = "start" placeholder = "Départ" 
                                onChangeText = {this.onChangeText} dataSearch = {searchValues} editable = {editable} />
                        </View>

                        <HideView hide = {display1}>
                            <InputTextAutoCorrection style = {[styles.input, {marginBottom: 20}]} 
                                value = {end} name = "end" placeholder = "Destination"
                                onChangeText = {this.onChangeText} dataSearch = {searchValues}  />
                        </HideView>

                        <HideView hide = {display2}>
                            <ElementPickerBackScreen  style = {{marginBottom: 20, marginHorizontal: 16}} selectValue = {pickerValue} values = {PickerValues}  
                                onValueChange = {(itemValue) => this.setState({pickerValue: itemValue})}/>
                            <InputTextBackScreen style = {[styles.input, {marginBottom: 20}]} 
                                name = "price" placeholder = "Prix" onChangeText = {this.onChangePriceText} onEnd = {this.endAddPath} value = {price} type = "number-pad"/>
                        </HideView>
                    
                    </View>
                    {
                        !loadingSearch ?
                                        <View style = {{marginBottom: 8}}>
                                            <FlatList
                                                data = {searchValues}
                                                keyExtractor = {(item, index) => item.key}
                                                renderItem = {({item}) => <ItemAutoCorrection text = {item.text} goAhead = {() => this.onClickItem(item.name, item.text)}/>}
                                            />
                                        </View> 
                                        : 
                                            <View><ActivityIndicator size="large" color="#E76F51" /></View>
                    }       
                    <View>
                        <ScrollView>
                            {
                                paths.map((item, index) => {
                                    return <DestinationAdds key = {index} start = {item.start} end = {item.end} price = {item.price}/>
                                })
                            }
                        </ScrollView>
                    
                    </View>
                    {
                        paths.length > 0 ? 
                                        <TouchableOpacity style = {styles.btnAddMore} onPress = {this.addNewPath}>
                                            <Text style = {styles.btnAddMoreText}>Ajouter une autre destination</Text>
                                        </TouchableOpacity>
                                        :
                                        <View></View>
                    }
                </View>
                
                <View style = {styles.btn}>
                    <ButtonMainApp title = "PUBLIER" action = {this.sendValue}/>
                </View>
                <ModalLoading active = {loading}/>
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
        backgroundColor: "#E76F51"
    },
    input:{
        marginHorizontal: 16,
        display: "flex"
    },
    btn:{
        marginHorizontal: 16,
        marginBottom: 18,
        marginTop: 10,
    },
    item: {
        flexDirection: "row",
        paddingHorizontal: 17,
        paddingVertical: 18,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderColor: "#E3E3E3",
    },
    textItem:{
        
    },
    desContent:{
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#E3E3E3",
        flexDirection: "row",
        backgroundColor: "#fff",
        justifyContent: "space-between"
    },
    start:{
        fontSize: 14,
        color: "#264653",
        width: 220
    },
    end:{
        width: 220, 
        fontSize: 12,
        color : "rgba(0, 0, 0, 0.6)"
    },
    endPrice:{
        fontSize: 12,
        color : "rgba(0, 0, 0, 0.6)"
    },
    btnAddMore:{
        padding: 15,
        backgroundColor: "#fff"
    },
    btnAddMoreText:{
        color: "#E76F51"
    }
})