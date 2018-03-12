import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image } from 'react-native'
import { Colors } from 'react-native-paper'

class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.any
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/background.jpg')}
          style={styles.backgroundImage}
        />
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueGrey50
  },
  backgroundImage: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    opacity: 0.2
  }
})

export default AppContainer
