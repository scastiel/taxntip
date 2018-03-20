import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Platform } from 'react-native'
import AppContainer from './AppContainer'
import provinces from './provinces'
import ProvinceDialog from './ProvinceDialog'
import RowsContainer from './RowsContainer'
import AppRow from './AppRow'
import { injectIntl, intlShape } from 'react-intl'
import { TouchableRipple, Switch, Caption } from 'react-native-paper'
import { compose } from 'recompose'
import { withState } from './StateContext'
import { pick } from 'ramda'
import CurrencyDialog from './CurrencyDialog'
import currencies from './currencies'

class Settings extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    provinceId: PropTypes.string,
    updateProvince: PropTypes.func,
    conversionCurrency: PropTypes.string,
    taxDetailsVisible: PropTypes.bool,
    updateTaxDetailsVisible: PropTypes.func,
    convertedPriceVisible: PropTypes.bool,
    updateConvertedPriceVisible: PropTypes.func,
    updateConversionCurrency: PropTypes.func
  }
  static propTypes = {
    updateProvince: () => {},
    updateTaxDetailsVisible: () => {},
    updateConvertedPriceVisible: () => {},
    updateConversionCurrency: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      provinceModalVisible: false,
      conversionCurrencyModalVisible: false
    }
  }

  getProvince(id) {
    return provinces.find(province => province.id === id)
  }

  getCurrency(currencyId) {
    return currencies.find(currency => currency.id === currencyId)
  }

  updateProvince(province) {
    const { updateProvince } = this.props
    updateProvince(province.id)
    this.setState({ provinceModalVisible: false })
  }

  updateConversionCurrency(currency) {
    const { updateConversionCurrency } = this.props
    updateConversionCurrency(currency.id)
    this.setState({ conversionCurrencyModalVisible: false })
  }

  renderProvinceRow() {
    const { provinceId, intl } = this.props
    const province = provinceId && this.getProvince(provinceId)
    return (
      <AppRow
        label={intl.formatMessage({ id: 'province' })}
        onPress={() => this.setState({ provinceModalVisible: true })}
      >
        <Caption>{province && province.name[intl.locale]}</Caption>
      </AppRow>
    )
  }

  renderConversionCurrencyRow() {
    const { conversionCurrency, intl } = this.props
    const currency = conversionCurrency && this.getCurrency(conversionCurrency)
    return (
      <AppRow
        label={intl.formatMessage({ id: 'conversionCurrency' })}
        onPress={() => this.setState({ conversionCurrencyModalVisible: true })}
      >
        <Caption>{currency && currency.name[intl.locale]}</Caption>
      </AppRow>
    )
  }

  renderSwitch({ value, onValueChange }) {
    return Platform.OS === 'android' ? (
      <TouchableRipple onPress={onValueChange}>
        <View pointerEvents="none">
          <Switch value={value} />
        </View>
      </TouchableRipple>
    ) : (
      <Switch value={value} onValueChange={onValueChange} />
    )
  }

  renderTaxesDetailRow() {
    const { taxDetailsVisible, updateTaxDetailsVisible, intl } = this.props
    return (
      <AppRow label={intl.formatMessage({ id: 'showTaxDetails' })}>
        {this.renderSwitch({
          value: taxDetailsVisible,
          onValueChange: () => {
            updateTaxDetailsVisible(!taxDetailsVisible)
          }
        })}
      </AppRow>
    )
  }

  renderConvertedPriceRow() {
    const {
      convertedPriceVisible,
      updateConvertedPriceVisible,
      intl
    } = this.props
    return (
      <AppRow label={intl.formatMessage({ id: 'showConvertedPrice' })}>
        {this.renderSwitch({
          value: convertedPriceVisible,
          onValueChange: () => {
            updateConvertedPriceVisible(!convertedPriceVisible)
          }
        })}
      </AppRow>
    )
  }

  render() {
    const { provinceId, conversionCurrency, convertedPriceVisible } = this.props
    const { provinceModalVisible, conversionCurrencyModalVisible } = this.state
    const province = provinceId && this.getProvince(provinceId)
    const currency = conversionCurrency && this.getCurrency(conversionCurrency)
    return (
      <AppContainer>
        <RowsContainer
          rows={[
            this.renderProvinceRow(),
            this.renderTaxesDetailRow(),
            this.renderConvertedPriceRow(),
            convertedPriceVisible && this.renderConversionCurrencyRow()
          ]}
        />
        <ProvinceDialog
          selectedProvince={province}
          provinces={provinces}
          visible={provinceModalVisible}
          onDismiss={province => this.updateProvince(province)}
        />
        <CurrencyDialog
          selectedCurrency={currency}
          currencies={currencies}
          visible={conversionCurrencyModalVisible}
          onDismiss={currency => this.updateConversionCurrency(currency)}
        />
      </AppContainer>
    )
  }
}

export default compose(
  injectIntl,
  withState(
    pick([
      'provinceId',
      'taxDetailsVisible',
      'convertedPriceVisible',
      'conversionCurrency'
    ]),
    pick([
      'updateProvince',
      'updateTaxDetailsVisible',
      'updateConvertedPriceVisible',
      'updateConversionCurrency'
    ])
  )
)(Settings)
