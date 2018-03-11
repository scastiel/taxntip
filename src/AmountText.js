import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'

class AmountText extends Component {
  static propTypes = {
    amount: PropTypes.number,
    currency: PropTypes.string
  }
  static defaultProps = {
    currency: '$'
  }

  render() {
    const { amount, currency, ...props } = this.props
    const formattedAmount = amount.toLocaleString('fr-CA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={[
            {
              textAlign: 'right',
              width: 100
            },
            props.style
          ]}
        >
          {formattedAmount}
        </Text>
        <View style={{ width: 20, height: 20 }}>
          <Text style={[props.style, { textAlign: 'center' }]}>
            {' '}
            {currency}
          </Text>
        </View>
      </View>
    )
  }
}

export default AmountText
