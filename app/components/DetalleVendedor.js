import React from 'react';
import { View, Text, Image } from 'react-native';

export default class DetalleVendedor extends React.Component {
    render() {
        let url = this.props.visits[this.props.indice].Salesman.Photo.url
        let image = this.props.visits[this.props.indice].Salesman.Photo ? <Image source={{uri:url}} resizeMode='contain' style={{width: 75, height: 75}}/> : null
        return(
            <View >
                <Text>{this.props.visits[this.props.indice].Salesman.fullname}</Text>
                {image}
            </View>

        );
    }
}