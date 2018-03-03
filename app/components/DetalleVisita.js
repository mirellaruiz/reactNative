import React from 'react';
import { View, Text} from 'react-native';

export default class DetalleVisita extends React.Component {
    render() {
        var cumplida =""
        if (this.props.visits[this.props.indice].fulfilledAt === null) {
            cumplida = "NO"
        }
        else{
            cumplida = "SI"
        }
        let date = this.props.visits[this.props.indice].plannedFor.split('T').shift().split('-').reverse().join('/')
        return(
            <View style={{flex: 1, flexDirection:'column', justifyContent:'center'}}>
                <Text> FECHA: {date}</Text>
                <Text> CUMPLIDA: {cumplida} </Text>
                <Text> NOTAS: {this.props.visits[this.props.indice].notes} </Text>
            </View>
        );
    }
}
