import React from 'react'
import { StatusBar } from 'react-native'
import {
  DefaultTheme,
  Provider as PaperProvider,
  Colors
} from 'react-native-paper'
import { ScreenOrientation, Font, AppLoading, Asset } from 'expo'
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
    assetsLoaded: false
  }

  async componentDidMount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT_UP)
    StatusBar.setBarStyle('light-content')
  }

  loadAssets() {
    return Promise.all([
      Asset.fromModule(require('./assets/background.jpg')).downloadAsync(),
      Font.loadAsync({
        Roboto: require('./assets/roboto/Roboto-Regular.ttf'),
        RobotoMedium: require('./assets/roboto/Roboto-Medium.ttf')
      })
    ])
  }

  render() {
    return this.state.assetsLoaded ? (
      <PaperProvider theme={theme}>
        <Main />
      </PaperProvider>
    ) : (
      <AppLoading
        startAsync={() => this.loadAssets()}
        onFinish={() => this.setState({ assetsLoaded: true })}
        onError={console.warn}
      />
    )
  }
}
