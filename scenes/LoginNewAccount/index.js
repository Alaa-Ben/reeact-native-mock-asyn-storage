import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
  Platform,
  Linking,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

export default class LoginNewAccount extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loginForm: {
        email: '',
        password: ''
      },
      loading: false,
      emails: [],
      isFocused: {
        email: false,
        password: false
      },
      disabled: true,
      credentials: null,
      rememberedEmail: null
    }
    this.redirectToDeleteAccount = this.redirectToDeleteAccount.bind(this)
    this.renderItem = this.renderItem.bind(this)
  }

  async retrieveEmails() {
    try {
      const values = await AsyncStorage.multiGet(['emails', 'credentials', 'rememberedEmail',
        'userCredentials', 'systemID', 'userID', 'domainName'])
      let emails_array, credentials, rememberedEmail, userCredentials, systemID, userID, domainName
      values.map((el) => {
        if (el[0] === 'emails') emails_array = el[1]
        if (el[0] === 'credentials') credentials = el[1]
        if (el[0] === 'rememberedEmail') rememberedEmail = el[1]
        if (el[0] === 'userCredentials') userCredentials = el[1]
        if (el[0] === 'systemID') systemID = parseInt(el[1])
        if (el[0] === 'userID') userID = parseInt(el[1])
        if (el[0] === 'domainName') domainName = el[1]
      })
      if (emails_array !== null) {
        this.setState({ emails: JSON.parse(emails_array), credentials, rememberedEmail },
          async () => {
                  AsyncStorage.multiRemove(['userCredentials', 'systemID', 'userID', 'domainName'])
          })
        }
    } catch (error) {
      console.log(error)
    }
  }

  storeEmail() {
    let emails = this.state.emails
    emails.push(this.state.loginForm.email)
    AsyncStorage.setItem('emails', JSON.stringify(emails))
  }

  redirectToDeleteAccount() {
    const { navigate } = this.props.navigation
    navigate('LoginDeleteAccount')
  }

  renderItem({ item }) {
    return (
      <TouchableHighlight
        onPress={() => { }} />
    )
  }

  componentDidMount() {
    this.retrieveEmails()
  }

  render() {
      return (
        <View style={styles.parentComponent} />
      )
  }
}

const styles = StyleSheet.create({
  parentComponent: {
    backgroundColor: '#fff',
    flex: 1
  }
})