import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

class AmountText extends Component {
  static propTypes = {
    amount: PropTypes.number,
    currency: PropTypes.string
  }
  static defaultProps = {
    currency: 'CAD'
  }

  render() {
    const { amount, currency, ...props } = this.props
    const formattedAmount = amount.toLocaleString('fr-CA', {
      currency: currency,
      currencyDisplay: 'symbol',
      style: 'currency'
    })
    return <Text {...props}>{formattedAmount}</Text>
  }
}

export default AmountText
