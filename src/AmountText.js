import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { injectIntl, intlShape } from 'react-intl'

class AmountText extends Component {
  static propTypes = {
    amount: PropTypes.number,
    currency: PropTypes.string,
    intl: intlShape.isRequired
  }
  static defaultProps = {
    currency: '$'
  }

  render() {
    const { amount, currency, intl, ...props } = this.props
    const formattedAmount = intl.formatNumber(amount, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

    const amountComp = (
      <Text
        style={[
          {
            textAlign: 'right'
          },
          props.style
        ]}
      >
        {formattedAmount}
      </Text>
    )

    const currencyComp = (
      <View style={{ width: 20, height: 20 }}>
        <Text style={[props.style, { textAlign: 'center' }]}> {currency}</Text>
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

export default injectIntl(AmountText)
