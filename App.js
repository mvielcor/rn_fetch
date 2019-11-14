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
  Button,
  Text,
} from 'react-native';


export class ComponentsDeText extends Component {
  render() {
    let array = this.props.llistaComponents.map((unElement, pos) => {
      if (pos % 2 === 0) {
        return (<Text style={{ fontWeight: 'bold' }}>{unElement.title}</Text>);
      } else {
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

  //Mètode per a connectar amb l'api i obtindre un llistat de tots els posts disponibles
  obtinPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      //fetch('http://my-json-server.typicode.com/mvielcor/JSONServer/posts')
      //fetch('https://localhost:3000/posts')
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

  insereixPost() {
    let dades = {
      title: 'PMDM',
      id: 10
    };
    
    let url = 'https://jsonplaceholder.typicode.com/posts';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(dades),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
      .then((resposta) => {
        if (resposta.ok) {
          return resposta.json();
        } else {
          console.log("Error fent el POST")
        }
      })
      .then(respostaJson => {
        console.log(respostaJson);
        alert("Dades introduides correctament {" + dades.id + "," + dades.title + "}");
      })
      .catch(error => {
        console.log("Error de xarxa: " + error);
      });
  }
  //Borrar el post 1
  deletePost() {
    let url = 'https://jsonplaceholder.typicode.com/posts/1';
    fetch(url, {
      method: 'DELETE',
    })
      .then((resposta) => {
        if (resposta.ok) {
          return resposta.json();
        } else {
          console.log("Error " + resposta.status + " fent el DELETE")
          return;
        }
      })
      .then(respostaJson => {
        console.log(respostaJson);
        alert("Dades esborrades correctament");
      })
      .catch(error => {
        console.log("Error de xarxa: " + error);
      });
  }

  putPost() {
    let dades = {
      title: 'Manel'
    };
    let url = 'https://jsonplaceholder.typicode.com/posts/1';
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(dades),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
      .then((resposta) => {
        if (resposta.ok) {
          return resposta.json();
        } else {
          console.log("Error fent el PUT")
        }
      })
      .then(respostaJson => {
        console.log(respostaJson);
        alert("Dades actualitzades correctament {" + dades.id + "," + dades.title + "}");
      })
      .catch(error => {
        console.log("Error de xarxa: " + error);
      });
  }
  //https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
  UNSAFE_componentWillMount() {
    this.obtinPosts();
  }

  render() {
    if (this.state.documentJSON.length != 0) {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.75 }} >
            <ComponentsDeText llistaComponents={this.state.documentJSON}></ComponentsDeText>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 15 }}>
            <Button title='Insereix' onPress={this.insereixPost} ></Button>
            <Button title='Delete' onPress={this.deletePost}></Button>
            <Button title='Update' onPress={this.putPost}></Button>
          </View>
        </View>
      );
    } else {
      return (
        <View><Text style={{ fontSize: 35 }}>Carregant ...</Text></View>
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