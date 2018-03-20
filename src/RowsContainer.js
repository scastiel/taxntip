import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { Paper, Divider } from 'react-native-paper'

class RowsContainer extends Component {
  static propTypes = {
    rows: PropTypes.array.isRequired
  }

  render() {
    const { rows } = this.props
    if (rows.length === 0) {
      return <Fragment />
    }
    return (
      <View style={styles.paperContainer}>
        <Paper style={styles.paper}>
          {rows.filter(Boolean).map((comp, index) => (
            <Fragment key={index}>
              {index > 0 && <Divider />}
              {comp}
            </Fragment>
          ))}
        </Paper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  paperContainer: {
    padding: 10,
    width: '100%',
    alignItems: 'center'
  },
  paper: {
    elevation: 2,
    maxWidth: 500,
    width: '100%'
  }
})

export default RowsContainer
