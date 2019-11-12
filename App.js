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
  View,
  Text,
} from 'react-native';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentJSON: undefined,
    };
  }
  //https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((resposta) => {
        if (resposta.ok) {
          return resposta.json();
        } else {
          console.log("Error connectant amb https://jsonplaceholder.typicode.com/posts/1")
        }
      })
      .then(respostaJson => {
        console.log(respostaJson);
        this.setState({ documentJSON: respostaJson })
      })
      .catch(error => {
        console.log("Error de xarxa: " + error);
      });
  }

  render() {
    let msg = "Carregant ...";
    return (
      <View>
        <Text style={styles.sectionTitle}>
        {
          (this.state.documentJSON != undefined ?
            this.state.documentJSON.title : msg)
        }
        </Text>
      </View>
    );
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