import React, { Component } from 'react'
import Settings from '../Settings'
import SettingsScreenHeader from './SettingsScreenHeader'

class SettingsScreen extends Component {
  static navigationOptions = {
    // eslint-disable-next-line react/display-name
    header: props => <SettingsScreenHeader {...props} />
  }

  render() {
    return <Settings />
  }
}

export default SettingsScreen
