import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import AmountText from './AmountText'
import withConversionRates from './withConversionRates'

class AmountTextWithConversion extends Component {
  static propTypes = {
    amount: PropTypes.number,
    amountStyle: PropTypes.any,
    convertedAmountStyle: PropTypes.any,
    showConvertedAmount: PropTypes.bool,
    rates: PropTypes.objectOf(PropTypes.number),
    ratesLoaded: PropTypes.bool
  }
  static defaultProps = {
    showConvertedAmount: false,
    ratesLoaded: false
  }

  render() {
    const {
      amount,
      amountStyle,
      convertedAmountStyle,
      showConvertedAmount,
      rates,
      ratesLoaded
    } = this.props
    return (
      <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
        <AmountText style={amountStyle} amount={amount} />
        {showConvertedAmount && (
          <AmountText
            isSecondary
            style={convertedAmountStyle}
            amount={ratesLoaded ? amount / (rates.CAD / rates.EUR) : null}
            currency="€"
          />
        )}
      </View>
    )
  }
}

export default withConversionRates(AmountTextWithConversion)
