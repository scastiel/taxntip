import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { TextInput, Text, StyleSheet } from 'react-native'
import { injectIntl, intlShape } from 'react-intl'
import { styles as amountTextStyles } from './AmountText'

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
      amountText: props.intl.formatNumber(props.amount).replace(/\s/g, '')
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
        style={[amountTextStyles.amount, styles.amountInput]}
        {...props}
      />
    )

    const currencyComp = <Text style={amountTextStyles.currency}> $</Text>

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

const styles = StyleSheet.create({
  amountInput: {
    textAlign: 'right',
    minWidth: 100,
    flexGrow: 1,
    flexShrink: 0,
    padding: 5,
    margin: -5
  }
})

export default injectIntl(AmountInput)
