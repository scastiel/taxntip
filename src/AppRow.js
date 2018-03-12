import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { TouchableRipple, Colors, Paragraph } from 'react-native-paper'
import AmountText from './AmountText'
import { fontProps } from './style'

class AppRow extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    children: PropTypes.any,
    label: PropTypes.any,
    isSecondary: PropTypes.bool,
    detailRows: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired
      })
    )
  }
  static defaultProps = {
    isSecondary: false,
    detailRows: null
  }

  render() {
    const { onPress, children, label, isSecondary, detailRows } = this.props

    const renderDetailRowDetail = (label, amount) => (
      <View key={label} style={styles.detailsRowContent}>
        <Paragraph
          style={[
            styles.label,
            styles.detailRowLabel,
            isSecondary && styles.secondary
          ]}
        >
          {label}
        </Paragraph>
        <AmountText
          isSecondary={isSecondary}
          style={styles.detailRowLabel}
          amount={amount}
        />
      </View>
    )

    const rowContent = (
      <Fragment>
        {label && (
          <Paragraph style={[styles.label, isSecondary && styles.secondary]}>
            {label}
          </Paragraph>
        )}
        {children}
      </Fragment>
    )

    const row = (
      <View style={detailRows ? styles.detailsRow : styles.row}>
        {detailRows ? (
          <Fragment>
            <View style={styles.detailsRowContent}>{rowContent}</View>
            <View style={styles.detailRowDetails}>
              {detailRows.map(({ label, amount }) =>
                renderDetailRowDetail(label, amount)
              )}
            </View>
          </Fragment>
        ) : (
          rowContent
        )}
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
  },
  label: {
    flex: 1,
    ...fontProps
  },
  secondary: {
    color: 'grey'
  },
  detailsRowContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  detailRowDetails: {
    marginTop: 5
  },
  detailRowLabel: {
    fontSize: 14
  }
})

export default AppRow
