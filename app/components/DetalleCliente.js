
import React from 'react';
import { View, Text } from 'react-native';

export default class DetalleCliente extends React.Component {
    render() {
        return(
            <View style={{flex: 1, flexDirection:'column', justifyContent:'center'}}>
                <Text>{this.props.visits[this.props.indice].Customer.name}</Text>
                <Text>{this.props.visits[this.props.indice].Customer.code}</Text>
                <Text>{this.props.visits[this.props.indice].Customer.phone1}</Text>
                <Text>{this.props.visits[this.props.indice].Customer.address1}</Text>
                <Text>{this.props.visits[this.props.indice].Customer.email1}</Text>
            </View>

        );
    }
}
