/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';

export class ComponentsDeText extends Component{
  render(){
    let array = this.props.llistaComponents.map((unElement, pos) => {
      if(pos%2===0){
      return (<Text style={{fontWeight: 'bold'}}>{unElement.title}</Text>);
      }else{
        return (<Text>{unElement.title}</Text>);
      }
    });

    return (
      <View>
        <ScrollView>
          <View>
           {array}
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentJSON: [],
    };
  }
 
  //https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
  UNSAFE_componentWillMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((resposta) => {
        if (resposta.ok) {
          return resposta.json();
        } else {
          console.log("Error connectant amb https://jsonplaceholder.typicode.com/posts/")
        }
      })
      .then(respostaJson => this.setState({ documentJSON: respostaJson }))
      .catch(error => {
        console.log("Error de xarxa: " + error);
      });
  }
  
  render() {
    if (this.state.documentJSON.length != 0) {
      return (
        <View style={{flex:1}} >
            <ComponentsDeText llistaComponents={this.state.documentJSON}></ComponentsDeText>
        </View>
      );
    }else{
      return (
        <View><Text style={{fontSize:35}}>Carregant ...</Text></View>
      );
    }
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});