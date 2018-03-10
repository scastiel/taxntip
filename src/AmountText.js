import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

class AmountText extends Component {
  static propTypes = {
    amount: PropTypes.number
  }

  render() {
    const { amount, ...props } = this.props
    const formattedAmount = amount.toLocaleString(undefined, {
      currency: 'CAD',
      style: 'currency'
    })
    return <Text {...props}>{formattedAmount}</Text>
  }
}

export default AmountText
