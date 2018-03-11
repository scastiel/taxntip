import React, { Component, Fragment } from 'react'
import { StyleSheet, Text, View, AsyncStorage } from 'react-native'
import {
  TouchableRipple,
  Toolbar,
  ToolbarContent,
  Button,
  Paragraph,
  Divider,
  Colors,
  Paper,
  ToolbarAction
} from 'react-native-paper'
import AmountText from './AmountText'
import AmountInput from './AmountInput'
import TipDialog from './TipDialog'
import provinces from './provinces'
import ProvinceDialog from './ProvinceDialog'
import AmountTextWithConversion from './AmountTextWithConversion'

class Main extends Component {
  state = {
    amount: 30,
    editMode: false,
    tipModalVisible: false,
    provinceModalVisible: false,
    tip: 0,
    province: null,
    taxDetailsVisible: true,
    loading: true,
    showConvertedPrice: true
  }

  componentWillMount() {
    this.loadStateFromStorage()
  }

  async loadStateFromStorage() {
    const [
      amount,
      province,
      tip,
      taxDetailsVisible,
      showConvertedPrice
    ] = await Promise.all(
      [
        'amount',
        'province',
        'tip',
        'taxDetailsVisible',
        'showConvertedPrice'
      ].map(async key => {
        const value = await AsyncStorage.getItem(key)
        return value ? JSON.parse(value) : null
      })
    )
    this.setState({
      amount: amount === null ? this.state.amount : amount,
      province:
        province === null
          ? this.state.province
          : provinces.find(p => p.name === province.name),
      tip: tip === null ? this.state.tip : tip,
      loading: province === null,
      provinceModalVisible: province === null,
      taxDetailsVisible:
        taxDetailsVisible === null
          ? this.state.taxDetailsVisible
          : taxDetailsVisible,
      showConvertedPrice:
        showConvertedPrice === null
          ? this.state.showConvertedPrice
          : showConvertedPrice
    })
  }

  async saveStateInStorage() {
    ;[
      'amount',
      'province',
      'tip',
      'taxDetailsVisible',
      'showConvertedPrice'
    ].forEach(key => {
      AsyncStorage.setItem(key, JSON.stringify(this.state[key]))
    })
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
    await this.setState({ amount, editMode: false })
    await this.saveStateInStorage()
  }

  updateTip(tip) {}

  render() {
    const {
      amount,
      editMode,
      tip,
      tipModalVisible,
      province,
      provinceModalVisible,
      taxDetailsVisible,
      loading,
      showConvertedPrice
    } = this.state
    return (
      <Fragment>
        <Toolbar>
          <ToolbarContent
            title="Taxes et pourboires"
            subtitle={loading ? 'Chargement…' : province.name}
          />
          <ToolbarAction
            icon="my-location"
            onPress={() => this.setState({ provinceModalVisible: true })}
          />
        </Toolbar>
        {!loading && (
          <View style={styles.container}>
            <Paper style={styles.paper}>
              <TouchableRipple
                onPress={() =>
                  this.state.editMode || this.setState({ editMode: true })
                }
              >
                <View style={styles.row}>
                  <Paragraph style={styles.label}>Prix hors taxes</Paragraph>
                  {editMode ? (
                    <Fragment>
                      <AmountInput
                        innerRef={ref => ref && ref.focus()}
                        amount={amount}
                        onBlur={amount => this.updateAmount(amount)}
                        style={styles.amountInput}
                      />
                      <Text style={styles.currency}> $</Text>
                    </Fragment>
                  ) : (
                    <AmountText style={styles.amount} amount={amount} />
                  )}
                </View>
              </TouchableRipple>
              <Divider />
              <TouchableRipple
                onPress={async () => {
                  await this.setState({ taxDetailsVisible: !taxDetailsVisible })
                  await this.saveStateInStorage()
                }}
              >
                <View style={styles.detailsRow}>
                  <View style={styles.detailsRowContent}>
                    <Paragraph style={styles.secondaryLabel}>
                      Taxes ({this.getTaxesPercentage().toLocaleString()} %)
                    </Paragraph>
                    <AmountText
                      style={styles.secondaryAmount}
                      amount={this.getTaxes()}
                    />
                  </View>
                  {taxDetailsVisible && (
                    <View style={styles.detailRowDetails}>
                      <View style={styles.detailsRowContent}>
                        <Paragraph style={styles.secondaryLabelDetail}>
                          Taxes province ({province.tax_province.toLocaleString()}{' '}
                          %)
                        </Paragraph>
                        <AmountText
                          style={styles.secondaryAmountDetail}
                          amount={this.getProvinceTaxes()}
                        />
                      </View>
                      <View style={styles.detailsRowContent}>
                        <Paragraph style={styles.secondaryLabelDetail}>
                          Taxes Canada ({province.tax_canada.toLocaleString()}{' '}
                          %)
                        </Paragraph>
                        <AmountText
                          style={styles.secondaryAmountDetail}
                          amount={this.getCanadaTaxes()}
                        />
                      </View>
                    </View>
                  )}
                </View>
              </TouchableRipple>
              {tip > 0 && (
                <Fragment>
                  <Divider />
                  <TouchableRipple
                    onPress={() =>
                      editMode || this.setState({ tipModalVisible: true })
                    }
                  >
                    <View style={styles.row}>
                      <Paragraph style={styles.secondaryLabel}>
                        Pourboire ({tip * 100} %)
                      </Paragraph>
                      <AmountText
                        style={styles.secondaryAmount}
                        amount={this.getTip()}
                      />
                    </View>
                  </TouchableRipple>
                </Fragment>
              )}
              <Divider />
              <TouchableRipple
                onPress={async () => {
                  await this.setState({
                    showConvertedPrice: !showConvertedPrice
                  })
                  await this.saveStateInStorage()
                }}
              >
                <View style={styles.row}>
                  <Paragraph style={styles.label}>Prix total</Paragraph>
                  <AmountTextWithConversion
                    amountStyle={styles.amount}
                    convertedAmountStyle={styles.convertedPrice}
                    amount={this.getNetPrice()}
                    showConvertedAmount={showConvertedPrice}
                  />
                </View>
              </TouchableRipple>
            </Paper>
            {tip === 0 && (
              <Button
                primary
                disabled={editMode}
                icon="add-circle"
                style={styles.addTipButton}
                onPress={() => this.setState({ tipModalVisible: true })}
              >
                Ajouter un pourboire
              </Button>
            )}
          </View>
        )}

        <TipDialog
          tip={tip}
          visible={tipModalVisible}
          onDismiss={async tip => {
            await this.setState({ tip, tipModalVisible: false })
            await this.saveStateInStorage()
          }}
        />
        <ProvinceDialog
          selectedProvince={province}
          provinces={provinces}
          visible={provinceModalVisible}
          onDismiss={async province => {
            await this.setState({
              province,
              provinceModalVisible: false,
              loading: false
            })
            await this.saveStateInStorage()
          }}
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
  container: {
    flex: 1,
    backgroundColor: Colors.blueGrey50
  },
  title: {
    fontSize: 24
  },
  paper: {
    margin: 10,
    elevation: 2
  },
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
  row: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grey50
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

export default Main
