import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import {
  Alert,
  Text,
  TextInput,
  View,
  TouchableHighlight
} from 'react-native';
import { login } from './../auth/auth';

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
};

export class Login extends Component {
  static propTypes = {
    Users: PropTypes.Object
  };

  constructor() {
    super();
    this.state = {
      password: undefined,
      userEmail: undefined,
      registerOnProgress: false
    }
  }

  handleLoginButton() {
    if (this.state.userEmail && this.state.password) {
      login(this.state.userEmail, this.state.password);
    }
    else {
      Alert.alert(
        'OMG, TYPE SOMETHING'
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
          placeholder={'password'}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({userEmail: text})}
          value={this.state.userEmail}
          placeholder={'email'}
        />
        <TouchableHighlight onPress={this.handleLoginButton.bind(this)}>
          <Text>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Relay.createContainer(Login, {
  initialVariables: {
    orderBy: null
  },
  fragments: {
    Users: () => {
      return Relay.QL `
          fragment on User {
              _id,
              email,
              name,
              createdAt
          }
      `;
    }
  }
});