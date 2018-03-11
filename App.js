import React from 'react'
import { StatusBar } from 'react-native'
import {
  DefaultTheme,
  Provider as PaperProvider,
  Colors
} from 'react-native-paper'
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
  componentDidMount() {
    StatusBar.setBarStyle('light-content')
  }

  render() {
    return (
      <PaperProvider theme={theme}>
        <Main />
      </PaperProvider>
    )
  }
}
