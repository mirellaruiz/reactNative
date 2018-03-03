import React from 'react';
import ListaVisitasElemento from "./ListaVisitasElemento";
import { AsyncStorage, Text, View, FlatList, TouchableHighlight} from 'react-native';

export default class VisitasScreen extends React.Component {

    constructor(props) {

        super(props);
        this.state = {visitas: [], stored: false};
        this.appClick = this.appClick.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.loadCRMVisits = this.loadCRMVisits.bind(this);
    }

    componentDidMount() {
        this.loadCRMVisits();
    }


    appClick(visita) {
        let indice = this.state.visitas.indexOf(visita);
        this.props.navigation.navigate('Detalles', { indice: indice, visits: this.state.visitas });

    }
    async _loadStoredVisits(){
        try {
            let response = await AsyncStorage.getItem('@P7_2017_IWEB:visits');
            var storedVisits = JSON.parse(response) || [];
            this.setState({visitas: storedVisits, stored:true});
                console.log('visitas almacenadas')
            }
        catch (error) {
            console.log('error visitas almacenadas')
        }
    }
    async _removeStoredVisits(){
        try {
            await AsyncStorage.removeItem('@P7_2017_IWEB:visits');
            if (this.state.stored === true) {
                let response = await AsyncStorage.getItem('@P7_2017_IWEB:visits');
                var storedVisits = await JSON.parse(response) || [];
                this.setState({visitas: storedVisits});
            }
            console.log('todas borradas con exito')
        } catch (error) {
            console.log('error no se han borrado todas')
        }
    }
    loadCRMVisits(){
        var url = "https://dcrmt.herokuapp.com/api/visits/flattened?token=c15ea7874b00c73ebb16";
        fetch(url)
            .then((response)=> {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then((data)=> {
                this.setState({visitas: data, stored: false});
                console.log('recarga correcta')
            });
    }
    render() {
        return (
            <View style={{flex:1, justifyContent:'center'}}>
                <View style={{flex:9}} >
            <FlatList data={this.state.visitas} renderItem={({item}) =>
                <ListaVisitasElemento visita={item} stored={this.state.stored} removeVisit={this._loadStoredVisits.bind(this)} visitasClick={this.appClick} visitas={this.state.visitas}/>}
                      keyExtractor={item => item.id}/>
            </View>
                <View style={{flex:1, backgroundColor: 'whitesmoke', flexDirection: 'row', justifyContent:'space-around', alignItems: 'center'}} >
                    <TouchableHighlight onPress={this.loadCRMVisits}><Text style = {{backgroundColor: 'whitesmoke', color: 'teal', fontWeight: 'bold'}}>CRM VISITS</Text></TouchableHighlight>
                    <TouchableHighlight onPress={this._loadStoredVisits.bind(this)}><Text style = {{backgroundColor: 'whitesmoke', color: 'teal', fontWeight: 'bold'}}>STORED VISITS</Text></TouchableHighlight>
                    <TouchableHighlight onPress={this._removeStoredVisits.bind(this)}><Text style = {{backgroundColor: 'whitesmoke', color: 'teal', fontWeight: 'bold'}}>REMOVE</Text></TouchableHighlight>
                </View>
            </View>
        );
    }

}
