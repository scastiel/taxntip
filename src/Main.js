import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { injectIntl, intlShape } from 'react-intl'
import AmountText from './AmountText'
import AmountInput from './AmountInput'
import TipDialog from './TipDialog'
import provinces from './provinces'
import ProvinceDialog from './ProvinceDialog'
import AmountTextWithConversion from './AmountTextWithConversion'
import AppToolbar from './AppToolbar'
import AppContainer from './AppContainer'
import AppRow from './AppRow'
import RowsContainer from './RowsContainer'
import { fontProps } from './style'

class Main extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    amount: PropTypes.number,
    provinceId: PropTypes.string,
    tip: PropTypes.number,
    taxDetailsVisible: PropTypes.bool,
    showConvertedPrice: PropTypes.bool,
    saveStateInStorage: PropTypes.func
  }
  static defaultProps = {
    amount: 30,
    provinceId: null,
    tip: 0,
    taxDetailsVisible: true,
    showConvertedPrice: true,
    saveStateInStorage: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      amount: props.amount,
      editMode: false,
      tipModalVisible: false,
      provinceModalVisible: props.provinceId === null,
      tip: props.tip,
      province: props.provinceId ? this.getProvince(props.provinceId) : null,
      taxDetailsVisible: props.taxDetailsVisible,
      showConvertedPrice: props.showConvertedPrice
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
    const { amount, province } = this.state
    return amount * province.tax_province / 100
  }

  getCanadaTaxes() {
    const { amount, province } = this.state
    return amount * province.tax_canada / 100
  }

  getTaxes() {
    return this.getProvinceTaxes() + this.getCanadaTaxes()
  }

  getNetPrice() {
    return this.state.amount + this.getTaxes() + this.getTip()
  }

  getTip() {
    return this.state.tip * this.state.amount
  }

  async updateAmount(amount) {
    const { saveStateInStorage } = this.props
    await this.setState({ amount, editMode: false })
    await saveStateInStorage(this.state)
  }

  renderExcTaxPriceRow() {
    const { editMode, amount } = this.state
    const { intl } = this.props
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
              onBlur={amount => this.updateAmount(amount)}
            />
          </Fragment>
        ) : (
          <AmountText style={styles.amount} amount={amount} />
        )}
      </AppRow>
    )
  }

  renderTaxesRow() {
    const { taxDetailsVisible, province } = this.state
    const { saveStateInStorage } = this.props

    return (
      <AppRow
        isSecondary
        onPress={async () => {
          await this.setState({
            taxDetailsVisible: !taxDetailsVisible
          })
          await saveStateInStorage(this.state)
        }}
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
    const { editMode, tip } = this.state
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
    const { showConvertedPrice } = this.state
    const { intl, saveStateInStorage } = this.props
    return (
      <AppRow
        label={intl.formatMessage({ id: 'totalPrice' })}
        onPress={async () => {
          await this.setState({
            showConvertedPrice: !showConvertedPrice
          })
          await saveStateInStorage(this.state)
        }}
      >
        <AmountTextWithConversion
          amountStyle={styles.amount}
          convertedAmountStyle={[styles.convertedPrice]}
          amount={this.getNetPrice()}
          showConvertedAmount={showConvertedPrice}
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

  async updateProvince(province) {
    const { saveStateInStorage } = this.props
    await this.setState({
      province,
      provinceModalVisible: false,
      loading: false
    })
    await saveStateInStorage(this.state)
  }

  async updateTip(tip) {
    const { saveStateInStorage } = this.props
    await this.setState({ tip, tipModalVisible: false })
    await saveStateInStorage(this.state)
  }

  render() {
    const { tip, tipModalVisible, province, provinceModalVisible } = this.state
    return (
      <Fragment>
        {province && (
          <Fragment>
            <AppToolbar
              province={province}
              onProvinceButtonPressed={() =>
                this.setState({ provinceModalVisible: true })
              }
            />
            <AppContainer>
              <RowsContainer
                rows={[
                  this.renderExcTaxPriceRow(),
                  this.renderTaxesRow(),
                  tip > 0 && this.renderTipRow(),
                  this.renderTotalPriceRow()
                ]}
              />
              {!tip && this.renderAddTipButton()}
            </AppContainer>
          </Fragment>
        )}

        <TipDialog
          tip={tip}
          visible={tipModalVisible}
          onDismiss={tip => this.updateTip(tip)}
        />
        <ProvinceDialog
          selectedProvince={province}
          provinces={provinces}
          visible={provinceModalVisible}
          onDismiss={province => this.updateProvince(province)}
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

export default injectIntl(Main)
