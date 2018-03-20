import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { injectIntl, intlShape } from 'react-intl'
import AmountText from './AmountText'
import AmountInput from './AmountInput'
import TipDialog from './TipDialog'
import provinces from './provinces'
import AmountTextWithConversion from './AmountTextWithConversion'
import AppContainer from './AppContainer'
import AppRow from './AppRow'
import RowsContainer from './RowsContainer'
import { fontProps } from './style'
import { withState } from './StateContext'
import { pick } from 'ramda'
import { compose } from 'recompose'

class Main extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    loaded: PropTypes.bool,
    amount: PropTypes.number,
    provinceId: PropTypes.string,
    tip: PropTypes.number,
    taxDetailsVisible: PropTypes.bool,
    convertedPriceVisible: PropTypes.bool,
    conversionCurrency: PropTypes.string,
    updateAmount: PropTypes.func,
    updateTip: PropTypes.func
  }
  static defaultProps = {
    loaded: false,
    updateAmount: () => {},
    updateTip: () => {}
  }

  constructor(props) {
    super(props)
    this.state = this.getStateFromProps(props)
  }

  componentWillReceiveProps(newProps) {
    this.setState(this.getStateFromProps(newProps))
  }

  getStateFromProps(props) {
    return {
      editMode: false,
      tipModalVisible: false,
      province: props.provinceId ? this.getProvince(props.provinceId) : null
    }
  }

  getProvince(id) {
    return provinces.find(p => p.id === id)
  }

  getTaxesPercentage() {
    const { province } = this.state
    return province.tax_canada + province.tax_province
  }

  getProvinceTaxes() {
    const { amount } = this.props
    const { province } = this.state
    return amount * province.tax_province / 100
  }

  getCanadaTaxes() {
    const { amount } = this.props
    const { province } = this.state
    return amount * province.tax_canada / 100
  }

  getTaxes() {
    return this.getProvinceTaxes() + this.getCanadaTaxes()
  }

  getNetPrice() {
    const { amount } = this.props
    return amount + this.getTaxes() + this.getTip()
  }

  getTip() {
    const { amount, tip } = this.props
    return tip * amount
  }

  renderExcTaxPriceRow() {
    const { editMode } = this.state
    const { intl, amount, updateAmount } = this.props
    return (
      <AppRow
        label={intl.formatMessage({ id: 'withoutTaxesPrice' })}
        onPress={() => editMode || this.setState({ editMode: true })}
      >
        {editMode ? (
          <Fragment>
            <AmountInput
              innerRef={ref => ref && ref.focus()}
              amount={amount}
              onBlur={amount => updateAmount(amount)}
            />
          </Fragment>
        ) : (
          <AmountText style={styles.amount} amount={amount} />
        )}
      </AppRow>
    )
  }

  renderTaxesRow() {
    const { province } = this.state
    const { taxDetailsVisible } = this.props

    return (
      <AppRow
        isSecondary
        label={this.formatPercentageLabel('taxes', this.getTaxesPercentage())}
        detailRows={
          taxDetailsVisible
            ? [
                {
                  label: this.formatPercentageLabel(
                    'provinceTaxes',
                    province.tax_province
                  ),
                  amount: this.getProvinceTaxes()
                },
                {
                  label: this.formatPercentageLabel(
                    'canadaTaxes',
                    province.tax_canada
                  ),
                  amount: this.getCanadaTaxes()
                }
              ]
            : null
        }
      >
        <AmountText
          isSecondary
          style={[styles.amount]}
          amount={this.getTaxes()}
        />
      </AppRow>
    )
  }

  formatPercentageLabel(labelId, percentage) {
    const { intl } = this.props
    return (
      intl.formatMessage({ id: labelId }) +
      ' (' +
      intl.formatNumber(percentage) +
      ' %)'
    )
  }

  renderTipRow() {
    const { tip } = this.props
    const { editMode } = this.state
    return (
      <AppRow
        label={this.formatPercentageLabel('tip', tip * 100)}
        isSecondary
        onPress={() => editMode || this.setState({ tipModalVisible: true })}
      >
        <AmountText
          isSecondary
          style={[styles.amount]}
          amount={this.getTip()}
        />
      </AppRow>
    )
  }

  renderTotalPriceRow() {
    const { intl, convertedPriceVisible, conversionCurrency } = this.props
    return (
      <AppRow label={intl.formatMessage({ id: 'totalPrice' })}>
        <AmountTextWithConversion
          amountStyle={styles.amount}
          convertedAmountStyle={[styles.convertedPrice]}
          currency={conversionCurrency}
          amount={this.getNetPrice()}
          showConvertedAmount={convertedPriceVisible}
        />
      </AppRow>
    )
  }

  renderAddTipButton() {
    const { editMode } = this.state
    const { intl } = this.props
    return (
      <Button
        primary
        disabled={editMode}
        icon="add-circle"
        style={styles.addTipButton}
        onPress={() => this.setState({ tipModalVisible: true })}
      >
        {intl.formatMessage({ id: 'addTip' })}
      </Button>
    )
  }

  render() {
    const { loaded, tip, updateTip } = this.props
    const { tipModalVisible, province } = this.state
    return (
      <Fragment>
        <AppContainer>
          {loaded &&
            province && (
              <Fragment>
                <RowsContainer
                  rows={[
                    this.renderExcTaxPriceRow(),
                    this.renderTaxesRow(),
                    tip > 0 && this.renderTipRow(),
                    this.renderTotalPriceRow()
                  ]}
                />
                {!tip && this.renderAddTipButton()}
              </Fragment>
            )}
        </AppContainer>

        <TipDialog
          tip={tip}
          visible={tipModalVisible}
          onDismiss={tip => updateTip(tip)}
        />
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  hint: {
    ...fontProps
  },
  addTipButton: {
    marginTop: 20,
    alignSelf: 'center'
  },
  convertedPrice: {
    fontSize: 14,
    marginTop: 5
  }
})

export default compose(
  withState(
    pick([
      'loaded',
      'amount',
      'provinceId',
      'tip',
      'taxDetailsVisible',
      'convertedPriceVisible',
      'conversionCurrency'
    ]),
    pick(['updateAmount', 'updateTip'])
  ),
  injectIntl
)(Main)
