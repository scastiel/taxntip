import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import AmountText from './AmountText'
import withConversionRates from './withConversionRates'
import { intlShape, injectIntl } from 'react-intl'
import { compose } from 'recompose'

class AmountTextWithConversion extends Component {
  static propTypes = {
    intl: intlShape,
    amount: PropTypes.number,
    amountStyle: PropTypes.any,
    convertedAmountStyle: PropTypes.any,
    showConvertedAmount: PropTypes.bool,
    currency: PropTypes.string,
    rates: PropTypes.objectOf(PropTypes.number),
    ratesLoaded: PropTypes.bool
  }
  static defaultProps = {
    showConvertedAmount: false,
    ratesLoaded: false,
    currency: 'CAD'
  }

  getConvertedAmount() {
    const { ratesLoaded, rates, amount, currency } = this.props
    return ratesLoaded ? amount / (rates.CAD / rates[currency]) : null
  }

  render() {
    const {
      amount,
      amountStyle,
      convertedAmountStyle,
      showConvertedAmount,
      currency
    } = this.props
    return (
      <View
        style={
          showConvertedAmount
            ? styles.viewWithConvertedAmount
            : styles.viewWithoutConvertedAmount
        }
      >
        <AmountText style={amountStyle} amount={amount} />
        {showConvertedAmount && (
          <AmountText
            isSecondary
            style={convertedAmountStyle}
            amount={this.getConvertedAmount()}
            currency={currency}
          />
        )}
      </View>
    )
  }
}

const viewStyle = {
  flex: 1,
  flexDirection: 'column',
  alignItems: 'flex-end'
}

const styles = StyleSheet.create({
  viewWithConvertedAmount: {
    ...viewStyle,
    height: 40
  },
  viewWithoutConvertedAmount: {
    ...viewStyle
  }
})

export default compose(injectIntl, withConversionRates)(
  AmountTextWithConversion
)
