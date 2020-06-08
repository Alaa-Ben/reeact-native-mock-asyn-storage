import 'react-native'
import React from 'react'
import LoginNewAccount from '../scenes/LoginNewAccount'
import LoginDeleteAccount from '../scenes/LoginDeleteAccount'
import MockedNavigator from '../__mocks__/MockedNavigator'

import { cleanup, render } from 'react-native-testing-library'

describe('Login', () => {
  afterEach(cleanup)
  it('LoginNewAccount renders correctly', () => {
    const { toJSON } = render(<MockedNavigator component={LoginNewAccount} />)
    expect(toJSON()).toMatchSnapshot()
  })

  it('LoginDeleteAccount renders correctly', () => {
    const { toJSON } = render(<MockedNavigator component={LoginDeleteAccount} />)
    expect(toJSON()).toMatchSnapshot()
  })
})