import React, { Component } from 'react'
import Main from '../Main'
import MainScreenHeader from './MainScreenHeader'

class MainScreen extends Component {
  static navigationOptions = {
    // eslint-disable-next-line react/display-name
    header: props => <MainScreenHeader {...props} />
  }

  render() {
    return <Main />
  }
}

export default MainScreen
