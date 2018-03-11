import React from 'react'
import { StatusBar } from 'react-native'
import {
  DefaultTheme,
  Provider as PaperProvider,
  Colors
} from 'react-native-paper'
import { ScreenOrientation, Font } from 'expo'
import Main from './src/Main'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.red800,
    accent: Colors.blue500
  }
}

export default class App extends React.Component {
  state = {
    fontLoaded: false
  }

  async componentDidMount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT_UP)
    StatusBar.setBarStyle('light-content')
    await Font.loadAsync({
      Roboto: require('./assets/roboto/Roboto-Regular.ttf'),
      RobotoMedium: require('./assets/roboto/Roboto-Medium.ttf')
    })
    this.setState({ fontLoaded: true })
  }

  render() {
    return (
      <PaperProvider theme={theme}>
        {this.state.fontLoaded && <Main />}
      </PaperProvider>
    )
  }
}
