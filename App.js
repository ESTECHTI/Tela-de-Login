import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyB0HboVpf0oPmx2sn7qWPq_cehRFAXCdTA",
  authDomain: "react-firebase-7cdd8.firebaseapp.com",
  databaseURL: "https://react-firebase-7cdd8.firebaseio.com",
  projectId: "react-firebase-7cdd8",
  storageBucket: "react-firebase-7cdd8.appspot.com",
  messagingSenderId: "318926937800"
};
firebase.initializeApp(config);

import { Container, Content, Header, Form, Item, Button, Label, Input } from 'native-base';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = ({
      email:'',
      password:''
    })
  }

  componentDidMount() {
    
    firebase.auth().onAuthStateChanged((user) => {

      if(user != null)
      {
        console.log(user)
      }
    })
  }

  signUpUser = (email, password) => {

    try{
      if(this.state.password.length<6)
      {
        alert("Please enter at least 6 characters")
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
    }
    catch(error){
      console.log(error.toString())
    }
  }

  loginUser = (email, password) => {
    try{
      firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
        console.log(user)
      })
    }
    catch(error){
      console.log(error.toString())
    }
  }

  async loginWithFacebook() {

    const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync
    ('2136915979887471', { permissions: ['public_profile'] })

    if(type == 'success')
    {
      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      firebase.auth().signInWithCredential(credential).catch((error) => {
        console.log(error)
      })
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input 
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({ email })}
            />
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input 
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(password) => this.setState({ password })}
            />
          </Item>

          <Button style={{ marginTop: 10, borderRadius: 20 }}
          full
          success
          onPress={() => this.loginUser(this.state.email, this.state.password)}
          >
            <Text style={{ color: '#fff', fontSize: 12 }}> Login </Text>
          </Button>

          <Button style={{ marginTop: 10, borderRadius: 20 }}
          full
          primary
          onPress={() => this.signUpUser(this.state.email, this.state.password)}
          >
            <Text style={{ color: '#fff', fontSize: 12 }}> Sign Up </Text>
          </Button>

          <Button style={{ marginTop: 10, borderRadius: 20 }}
          full
          primary
          onPress={() => this.loginWithFacebook()}
          >
            <Text style={{ color: '#fff', fontSize: 12 }}> Login With Facebook </Text>
          </Button>

        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  }
})

