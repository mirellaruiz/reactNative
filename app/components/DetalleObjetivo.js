
import React from 'react';
import DetalleObjetivoElemento from "./DetalleObjetivoElemento";

import {View, Text, FlatList} from 'react-native';

export default class DetalleObjetivo extends React.Component {
    render() {
        return(
            <FlatList data={this.props.visits[this.props.indice].Targets} renderItem={({item}) =>
                <View><DetalleObjetivoElemento objetivo={item}/></View> } keyExtractor={item => item.id}
            />

        );
    }
}

