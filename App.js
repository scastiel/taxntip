import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import {
  DefaultTheme,
  Provider as PaperProvider,
  TextInput,
  Colors
} from 'react-native-paper'
import Main from './src/Main'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.blue800
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
