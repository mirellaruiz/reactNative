import React from 'react';
import DetalleCliente from "./DetalleCliente";
import DetalleVisita from "./DetalleVisita";
import DetalleObjetivo from "./DetalleObjetivo";
import DetalleVendedor from "./DetalleVendedor";
import { View, Text, TouchableHighlight, StyleSheet, Image} from 'react-native';

export default class Detalles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {style: 'darkgray'};
        this.clickFav = this.clickFav.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount() {
console.log(this.props.navigation.state.params.indice)
        if (this.props.navigation.state.params.indice === null) {
            return;
        }
        if (this.props.navigation.state.params.visits[this.props.navigation.state.params.indice].favourite === false) {
            this.setState({style: 'darkgray'});

        }
        else {
            this.setState({style: 'gold'});
        }

    }
    clickFav() {
        let id = this.props.navigation.state.params.visits[this.props.navigation.state.params.indice].id;
        if(this.props.navigation.state.params.visits[this.props.navigation.state.params.indice].favourite === false) {
            var url = "https://dcrmt.herokuapp.com/api/users/tokenOwner/favourites/" + id + "?token=c15ea7874b00c73ebb16&_method=PUT";
            fetch(url)
                .then((response)=> {
                    if (response.status >= 400) {
                        throw new Error("Bad response from server");
                    }

                    this.props.navigation.state.params.visits[this.props.navigation.state.params.indice].favourite = true;
                    this.setState({style: 'gold'});
                });
        }
        else {
            var url = "https://dcrmt.herokuapp.com/api/users/tokenOwner/favourites/" + id + "?token=c15ea7874b00c73ebb16&_method=DELETE";
            fetch(url)
                .then((response)=> {
                    if (response.status >= 400) {
                        throw new Error("Bad response from server");
                    }

                    this.props.navigation.state.params.visits[this.props.navigation.state.params.indice].favourite = false;
                    this.setState({style: 'darkgray'});

                });
        }

    }
    render() {
        if(this.props.navigation.state.params.indice === null) {
            return <Text>
                PULSE UNA VISITA PARA VER SUS DETALLES.
            </Text>;
        }
        else {
            return (
                <View style={{flex:1, flexDirection: 'column', justifyContent:'center', backgroundColor: 'white'}}>
                    <TouchableHighlight style={{alignSelf:'flex-end'}}
                                        onPress={() => this.props.navigation.goBack(null)}>
                        <Text style={{fontSize:25, fontWeight: 'bold', marginBottom: 20, color:'teal'}}>X</Text>
                    </TouchableHighlight>
                <View style={{flex:1, flexDirection: 'column', justifyContent:'center'}} >
                    <View style={{flex:1, flexDirection: 'row', justifyContent:'center'}} >
                        <Text style = {styles.t1}> DETALLES </Text>
                        <TouchableHighlight style={{alignSelf:'flex-start'}} onPress={() => {this.clickFav()}}>
                            <Text style={{fontSize:25, fontWeight: 'bold', backgroundColor: this.state.style, marginBottom: 20, color:'white'}}>FAV</Text>
                        </TouchableHighlight></View>
                    <View style={{flex:3}} >
                        <Text style = {styles.t2}> DETALLES DE LA VISITA </Text>
                        <View style={{flex:4}}><DetalleVisita visits={this.props.navigation.state.params.visits} indice={this.props.navigation.state.params.indice}/></View>
                    </View>
                    <View style={{flex:3}} >
                        <View style={{flex:1, flexDirection: 'row', justifyContent:'center', alignItems: 'center', marginRight: 130}}>
                            <Text style = {styles.t2}> DETALLE DE LOS OBJETIVOS </Text>
                            <Image source={require('./scroll.png')}  resizeMode='contain' style={{width: 15, height: 15}} />
                        </View>
                        <View style={{flex:4, backgroundColor: 'whitesmoke'}}><DetalleObjetivo visits={this.props.navigation.state.params.visits} indice={this.props.navigation.state.params.indice}/></View>

                    </View>
                    <View style={{flex:3}} >
                        <Text style = {styles.t2}> DETALLE DEL CLIENTE </Text>
                        <View style={{flex:4}}><DetalleCliente visits={this.props.navigation.state.params.visits} indice={this.props.navigation.state.params.indice}/></View>
                    </View>
                    <View style={{flex:3}} >
                        <Text style = {styles.t2}> DETALLE DEL VENDEDOR </Text>
                        <View style={{flex:4}}><DetalleVendedor visits={this.props.navigation.state.params.visits} indice={this.props.navigation.state.params.indice}/></View>
                    </View>
                </View>
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
    },
    t1: {
        flex: 1,
        fontWeight: 'bold',
        color: 'teal',
        fontSize: 20,
    },
    t2:{
        flex: 1,
        justifyContent: 'space-around',
        fontWeight: 'bold',
        color: 'teal',
        alignItems: 'center',
    }
})
