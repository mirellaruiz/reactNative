import React from 'react';
import {AsyncStorage, TouchableHighlight,StyleSheet, Text, View } from 'react-native';

export default class ListaVisitasElemento extends React.Component {

    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }
    click() {
        this.props.visitasClick(this.props.visita);
    }
    async _saveVisit(){
        try {
            let response = await AsyncStorage.getItem('@P7_2017_IWEB:visits');
            var visitsStored = await JSON.parse(response) || [];
           var store = false
            if(visitsStored.length > 0) {
                visitsStored.map((visita, indice) => {

                    if (visita.id === this.props.visita.id) {
                        store = true
                    }

                });
            }
            if (store === false){
                visitsStored.push(this.props.visita);
                var currentVisit = await JSON.stringify(visitsStored);
                await AsyncStorage.setItem('@P7_2017_IWEB:visits', currentVisit);
           console.log('visita añadida')
            }
        }catch (error) {
            console.log("error")
        }
    }
    async _removeVisit(){
        try {
            let response = await AsyncStorage.getItem('@P7_2017_IWEB:visits');
            var visitsStored = await JSON.parse(response) || [];
            var index = null
           if(visitsStored.length > 0) {
                visitsStored.map((visita, indice) => {
                   if(visita.id === this.props.visita.id){
                       index = indice
                       console.log("element")
                       console.log(index)
                   }
               })
           }
          if(index !== null) {
              visitsStored.splice(index, 1)
              var currentVisit = await JSON.stringify(visitsStored);
              await AsyncStorage.setItem('@P7_2017_IWEB:visits', currentVisit);
              if (this.props.stored === true) {
                  this.props.removeVisit()
              }
          }
          else{
                console.log("la visita no pertenecia")
          }
        }catch (error) {
            console.log("error")
        }
    }
    render() {
        let date = this.props.visita.plannedFor.split('T').shift().split('-').reverse().join('/')
        return (
            <View style = {styles.container}>
                <Text style={{flex: 1, color: 'white'}}>Vendedor: {this.props.visita.Salesman.fullname}</Text>
                <Text style={{flex: 1, color: 'white'}}>  Cliente: {this.props.visita.Customer.name}</Text>
                <Text style={{flex: 1, color: 'white'}}> Fecha: {date}</Text>
                <View style={{flex:2, flexDirection: 'row', justifyContent:'space-around'}} >
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><TouchableHighlight onPress={this.click}><Text style = {{color: 'white', fontWeight: 'bold'}}>SELECCIONAR</Text></TouchableHighlight></View>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><TouchableHighlight onPress={this._saveVisit.bind(this)}><Text style = {{color: 'white', fontWeight: 'bold'}}>GUARDAR</Text></TouchableHighlight></View>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><TouchableHighlight onPress={this._removeVisit.bind(this)}><Text style = {{color: 'white', fontWeight: 'bold'}}>ELIMINAR</Text></TouchableHighlight></View>
                </View>
            </View>
        );

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'teal'
    }
})
