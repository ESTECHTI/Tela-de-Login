import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDqJEhI8cZvR4SPnWv-x6Sfn2wmwfG-h7I",
    authDomain: "reactnativefirebase-fac0e.firebaseapp.com",
    databaseURL: "https://reactnativefirebase-fac0e.firebaseio.com",
    projectId: "reactnativefirebase-fac0e",
    storageBucket: "reactnativefirebase-fac0e.appspot.com",
    messagingSenderId: "647531494904"
};

firebase.initializeApp(firebaseConfig);

import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'; 

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = ({
      email: '',
      password: ''
    })
  }

  signUpUser = (email, password) => {

    try {

      if (this.state.password.length<6) 
      {
        alert("Please enter at least 6 characters")
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, password)
    }
    catch (error) {
      console.log(error.toString())
    }
  }

  loginUser = (email, password) => {

    try {
      firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
        console.log(user)
      })
    }
    catch(error){
      console.log(error.toString())
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

            <Button style={{ marginTop: 10 }} full success 
              //rounded
              //success
              onPress={()=> this.loginUser(this.state.email,this.state.password)}
            >
              <Text style={{ color: '#fff' }}> Login</Text>
            </Button>

            <Button style={{ marginTop: 10 }} full primary 
              //rounded
              //primary
              onPress={()=> this.signUpUser(this.state.email,this.state.password)}
            >
              <Text style={{ color: '#fff' }}> Sign Up</Text>
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
  },
});
