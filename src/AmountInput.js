import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextInput } from 'react-native'

class AmountInput extends Component {
  static propTypes = {
    amount: PropTypes.number,
    onBlur: PropTypes.func,
    innerRef: PropTypes.func
  }
  static defaultProps = {
    amount: 0,
    onBlur: () => {},
    innerRef: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      amountText: props.amount.toLocaleString()
    }
  }

  updateAmount() {
    const cleamAmountText = this.state.amountText.replace(/,/, '.')
    const amount = parseFloat(cleamAmountText)
    this.props.onBlur(isNaN(amount) ? 0 : amount)
  }

  render() {
    const { innerRef, onBlur, amount, ...props } = this.props
    const { amountText } = this.state
    return (
      <TextInput
        ref={innerRef}
        value={amountText}
        keyboardType="numeric"
        returnKeyType="done"
        onChangeText={text => this.setState({ amountText: text })}
        onBlur={() => this.updateAmount()}
        {...props}
      />
    )
  }
}

export default AmountInput
