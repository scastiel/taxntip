import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { TouchableRipple, Colors } from 'react-native-paper'

class AppRow extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    children: PropTypes.any,
    hasDetails: PropTypes.bool
  }
  static defaultProps = {
    hasDetails: false
  }

  render() {
    const { onPress, children, hasDetails } = this.props
    const row = (
      <View style={hasDetails ? styles.detailsRow : styles.row}>
        {children}
      </View>
    )
    return onPress ? (
      <TouchableRipple onPress={onPress}>{row}</TouchableRipple>
    ) : (
      row
    )
  }
}

const styles = StyleSheet.create({
  row: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grey50
  },
  detailsRow: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'column',
    backgroundColor: Colors.grey50
  }
})

export default AppRow
