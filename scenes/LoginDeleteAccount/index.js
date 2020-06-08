import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  Linking
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Col, Row, Grid } from 'react-native-easy-grid'
import AsyncStorage from '@react-native-community/async-storage'
import SplashScreen from 'react-native-splash-screen'

export default class LoginDeleteAccount extends Component {

  constructor(props) {
    super(props)
    this.state = {
      emails: []
    }
    this.renderItem = this.renderItem.bind(this)
  }

  async retrieveEmails() {
    try {
      const emails_array = await AsyncStorage.getItem('emails')
      if (emails_array !== null) this.setState({
        emails: JSON.parse(emails_array)
      })
    } catch (error) {
      console.log(error)
    }
  }

  redirectToNewAccount() {
    const { navigate } = this.props.navigation
    navigate('LoginNewAccount')
  }

  deleteAccount(email) {
    let emails = this.state.emails
    for (let index in emails) {
      if (emails[index] === email) {
        emails.splice(index, 1)
        this.setState({
          emails: emails
        })
        AsyncStorage.setItem('emails', JSON.stringify(this.state.emails))
        if (this.state.emails.length === 0) this.redirectToNewAccount()
        break
      }
    }
  }

  renderItem({ item }) {
    return (
      <Button
        icon={
          <Icon
            name='trash'
            size={20}
            style={{
              marginLeft: 20
            }}
            light
          />
        }
        iconRight
        buttonStyle={{ backgroundColor: 'transparent' }}
        titleStyle={{ color: 'grey', fontFamily: 'roboto', fontSize: 18 }}
        title={item}
        onPress={() => { this.deleteAccount(item) }} />
    )
  }

  componentDidMount() {
    this.retrieveEmails()
  }

  render() {
    return (
      <View style={styles.parentComponent}>
        <Grid style={{ height: hp('100%'), backgroundColor: '#fff' }}>
          <Col size={10} />
          <Col size={80} >
            <Row size={0.5} style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }}>
              <Text style={styles.welcomeText}>
                login.welcome1
              </Text>
              <Text style={styles.subWelcomeText}>
                login.welcome2
              </Text>
            </Row>
            <Row style={{ flexDirection: 'column', justifyContent: 'center' }}>
              <Text style={styles.deleteAccountText}>
                login.deleteAccount
              </Text>
              <FlatList
                contentContainerStyle={{ alignItems: 'flex-start' }}
                data={this.state.emails}
                renderItem={this.renderItem}
                keyExtractor={item => item}
                style={{ width: wp('75%') }}
              />
            </Row>
          </Col>
          <Col size={10} />
        </Grid>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrappingView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeText: {
    fontSize: 24,
    color: '#444444',
    flexWrap: 'wrap',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold'
  },
  subWelcomeText: {
    fontSize: 15,
    color: '#444444',
    flexWrap: 'wrap',
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    width: '100%'
  },
  deleteAccountText: {
    marginBottom: 10,
    fontSize: 16,
    color: '#444444',
    flexWrap: 'wrap',
    fontFamily: 'roboto'
  },
  parentComponent: {
    backgroundColor: '#fff',
    flex: 1
  },
})