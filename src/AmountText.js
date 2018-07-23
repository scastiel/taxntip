import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, StyleSheet } from 'react-native'
import { injectIntl, intlShape } from 'react-intl'

class AmountText extends Component {
  static propTypes = {
    amount: PropTypes.number,
    currency: PropTypes.string,
    intl: intlShape.isRequired,
    style: PropTypes.any,
    isSecondary: PropTypes.bool
  }
  static defaultProps = {
    currency: 'CAD',
    isSecondary: false
  }

  render() {
    const { amount, currency, intl, style, isSecondary } = this.props
    const formattedAmount =
      amount === null
        ? '-'
        : intl.formatNumber(amount, {
            style: 'currency',
            currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })

    return (
      <View style={styles.amountText}>
        <Text style={[styles.amount, isSecondary && styles.secondary, style]}>
          {formattedAmount}
        </Text>
      </View>
    )
  }
}

const amountStyle = {
  fontFamily: 'RobotoMedium',
  fontSize: 18
}

export const styles = StyleSheet.create({
  amountText: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end'
  },
  amount: {
    ...amountStyle,
    textAlign: 'right'
  },
  currency: {
    ...amountStyle,
    flex: 1,
    textAlign: 'left',
    width: 50
  },
  secondary: {
    color: 'grey'
  }
})

export default injectIntl(AmountText)
