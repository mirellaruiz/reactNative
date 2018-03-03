
import React from 'react';
import { View, Text} from 'react-native';

export default class DetalleObjetivoElemento extends React.Component {
    render() {
        var cumplido = ""
        if (this.props.objetivo.success === true){
            cumplido = "SI"
        }
        else if (this.props.objetivo.success === false){
            cumplido = "NO"
        }
        else {
            cumplido = "PENDIENTE"
        }
        return(
            <View style={{flex: 1, flexDirection:'column', justifyContent:'center'}}>
                <Text style={{fontWeight: 'bold'}}> OBJETIVO {this.props.objetivo.id}</Text>
                <Text> EMPRESA: {this.props.objetivo.Company.name} : ({this.props.objetivo.TargetType.name})</Text>
                <Text> NOTAS: {this.props.objetivo.notes}</Text>
                <Text> CUMPLIDO: {cumplido}</Text>
            </View>
        );
    }
}
