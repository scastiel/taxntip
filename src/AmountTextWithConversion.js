import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import AmountText from './AmountText'

class AmountTextWithConversion extends Component {
  static propTypes = {
    amount: PropTypes.number,
    amountStyle: PropTypes.any,
    convertedAmountStyle: PropTypes.any,
    showConvertedAmount: PropTypes.bool
  }
  static defaultProps = {
    showConvertedAmount: false
  }

  render() {
    const {
      amount,
      amountStyle,
      convertedAmountStyle,
      showConvertedAmount
    } = this.props
    return (
      <View style={{ flexDirection: 'column' }}>
        <AmountText style={amountStyle} amount={amount} />
        {showConvertedAmount && (
          <AmountText
            style={convertedAmountStyle}
            amount={amount / 1.58}
            currency="EUR"
          />
        )}
      </View>
    )
  }
}

export default AmountTextWithConversion
