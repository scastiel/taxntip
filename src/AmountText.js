import React, { Component, Fragment } from 'react'
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
    currency: '$',
    isSecondary: false
  }

  render() {
    const { amount, currency, intl, style, isSecondary } = this.props
    const formattedAmount =
      amount === null
        ? '-'
        : intl.formatNumber(amount, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })

    const amountComp = (
      <Text style={[styles.amount, isSecondary && styles.secondary, style]}>
        {formattedAmount}
      </Text>
    )

    const currencyComp = (
      <View style={{ width: 20, height: 20 }}>
        <Text style={[styles.currency, isSecondary && styles.secondary, style]}>
          {' '}
          {currency}
        </Text>
      </View>
    )

    return (
      <View style={{ flexDirection: 'row' }}>
        {intl.locale === 'fr' ? (
          <Fragment>
            {amountComp}
            {currencyComp}
          </Fragment>
        ) : (
          <Fragment>
            {currencyComp}
            {amountComp}
          </Fragment>
        )}
      </View>
    )
  }
}

const amountStyle = {
  fontFamily: 'RobotoMedium',
  fontSize: 18,
  letterSpacing: 1
}

export const styles = StyleSheet.create({
  amount: {
    ...amountStyle,
    textAlign: 'right'
  },
  currency: {
    ...amountStyle,
    textAlign: 'center'
  },
  secondary: {
    color: 'grey'
  }
})

export default injectIntl(AmountText)
