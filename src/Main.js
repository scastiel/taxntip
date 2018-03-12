import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Button, Paragraph, Colors } from 'react-native-paper'
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
    provinceId: 'QC',
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
      provinceModalVisible: false,
      tip: props.tip,
      province:
        this.getProvince(props.provinceId) ||
        this.getProvince(Main.defaultProps.provinceId),
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
      <AppRow onPress={() => editMode || this.setState({ editMode: true })}>
        <Paragraph style={styles.label}>
          {intl.formatMessage({ id: 'withoutTaxesPrice' })}
        </Paragraph>
        {editMode ? (
          <Fragment>
            <AmountInput
              innerRef={ref => ref && ref.focus()}
              amount={amount}
              onBlur={amount => this.updateAmount(amount)}
              style={styles.amountInput}
              currencyStyle={styles.currency}
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
    const { intl, saveStateInStorage } = this.props
    return (
      <AppRow
        hasDetails={true}
        onPress={async () => {
          await this.setState({
            taxDetailsVisible: !taxDetailsVisible
          })
          await saveStateInStorage(this.state)
        }}
      >
        <View style={styles.detailsRowContent}>
          <Paragraph style={styles.secondaryLabel}>
            {intl.formatMessage({ id: 'taxes' })} ({intl.formatNumber(
              this.getTaxesPercentage()
            )}{' '}
            %)
          </Paragraph>
          <AmountText style={styles.secondaryAmount} amount={this.getTaxes()} />
        </View>
        {taxDetailsVisible && (
          <View style={styles.detailRowDetails}>
            <View style={styles.detailsRowContent}>
              <Paragraph style={styles.secondaryLabelDetail}>
                {intl.formatMessage({ id: 'provinceTaxes' })} ({intl.formatNumber(
                  province.tax_province
                )}{' '}
                %)
              </Paragraph>
              <AmountText
                style={styles.secondaryAmountDetail}
                amount={this.getProvinceTaxes()}
              />
            </View>
            <View style={styles.detailsRowContent}>
              <Paragraph style={styles.secondaryLabelDetail}>
                {intl.formatMessage({ id: 'canadaTaxes' })} ({intl.formatNumber(
                  province.tax_canada
                )}{' '}
                %)
              </Paragraph>
              <AmountText
                style={styles.secondaryAmountDetail}
                amount={this.getCanadaTaxes()}
              />
            </View>
          </View>
        )}
      </AppRow>
    )
  }

  renderTipRow() {
    const { editMode, tip } = this.state
    const { intl } = this.props
    return (
      <AppRow
        onPress={() => editMode || this.setState({ tipModalVisible: true })}
      >
        <Paragraph style={styles.secondaryLabel}>
          {intl.formatMessage({ id: 'tip' })} ({intl.formatNumber(tip * 100)} %)
        </Paragraph>
        <AmountText style={styles.secondaryAmount} amount={this.getTip()} />
      </AppRow>
    )
  }

  renderTotalPriceRow() {
    const { showConvertedPrice } = this.state
    const { intl, saveStateInStorage } = this.props
    return (
      <AppRow
        onPress={async () => {
          await this.setState({
            showConvertedPrice: !showConvertedPrice
          })
          await saveStateInStorage(this.state)
        }}
      >
        <Paragraph style={styles.label}>
          {intl.formatMessage({ id: 'totalPrice' })}
        </Paragraph>
        <AmountTextWithConversion
          amountStyle={styles.amount}
          convertedAmountStyle={styles.convertedPrice}
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
          {tip === 0 && this.renderAddTipButton()}
        </AppContainer>

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

const fontProps = {
  fontSize: 18,
  fontFamily: 'Roboto'
}

const amountFontProps = {
  fontFamily: 'RobotoMedium',
  fontSize: 18,
  letterSpacing: 1
}

const labelProps = {
  flex: 1,
  ...fontProps
}

const amountProps = {
  ...amountFontProps
}

const secondaryProps = {
  color: 'grey'
}

const styles = StyleSheet.create({
  amountInput: {
    textAlign: 'right',
    flex: 1,
    ...amountFontProps
  },
  currency: {
    ...amountFontProps,
    width: 20,
    textAlign: 'center'
  },
  amount: {
    ...amountProps
  },
  secondaryAmount: {
    ...secondaryProps,
    ...amountProps
  },
  secondaryAmountDetail: {
    ...secondaryProps,
    ...amountProps,
    fontSize: 14
  },
  detailsRow: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'column',
    backgroundColor: Colors.grey50
  },
  detailsRowContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  detailRowDetails: {
    marginTop: 5
  },
  label: {
    ...labelProps
  },
  secondaryLabel: {
    ...secondaryProps,
    ...labelProps
  },
  secondaryLabelDetail: {
    ...secondaryProps,
    ...labelProps,
    fontSize: 14
  },
  hint: {
    ...fontProps
  },
  addTipButton: {
    marginTop: 20,
    alignSelf: 'center'
  },
  convertedPrice: {
    ...secondaryProps,
    ...amountProps,
    fontSize: 14,
    marginTop: 5
  }
})

export default injectIntl(Main)
