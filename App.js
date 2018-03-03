import React from 'react';
import { StackNavigator } from 'react-navigation';
import VisitasScreen from './app/components/VisitasScreen';
import DetallesScreen from './app/components/DetallesScreen';

export default App = StackNavigator({
    Index: {
        screen: VisitasScreen
    },
    Detalles: {
        screen: DetallesScreen
    }
},{
    headerMode: 'none'
})

