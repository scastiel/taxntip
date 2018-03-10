import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider as PaperProvider, TextInput } from 'react-native-paper'
import Main from './src/Main'

export default class App extends React.Component {
  state = {
    text: 'hello'
  }
  render() {
    return (
      <PaperProvider>
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
