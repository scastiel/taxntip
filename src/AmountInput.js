import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { TextInput, Text } from 'react-native'
import { injectIntl, intlShape } from 'react-intl'

class AmountInput extends Component {
  static propTypes = {
    amount: PropTypes.number,
    onBlur: PropTypes.func,
    innerRef: PropTypes.func,
    currencyStyle: PropTypes.any,
    intl: intlShape.isRequired
  }
  static defaultProps = {
    amount: 0,
    onBlur: () => {},
    innerRef: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      amountText: props.intl.formatNumber(props.amount)
    }
  }

  updateAmount() {
    const cleamAmountText = this.state.amountText.replace(/,/, '.')
    const amount = parseFloat(cleamAmountText)
    this.props.onBlur(isNaN(amount) ? 0 : amount)
  }

  render() {
    const {
      innerRef,
      onBlur,
      amount,
      currencyStyle,
      intl,
      ...props
    } = this.props
    const { amountText } = this.state

    const inputComp = (
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

    const currencyComp = <Text style={currencyStyle}> $</Text>

    return intl.locale === 'fr' ? (
      <Fragment>
        {inputComp}
        {currencyComp}
      </Fragment>
    ) : (
      // FIXME: no beautiful way to display currency at the left of the input field
      <Fragment>{inputComp}</Fragment>
    )
  }
}

export default injectIntl(AmountInput)
