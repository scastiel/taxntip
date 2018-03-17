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

class Settings extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    provinceId: PropTypes.string,
    updateProvince: PropTypes.func,
    taxDetailsVisible: PropTypes.bool,
    updateTaxDetailsVisible: PropTypes.func,
    convertedPriceVisible: PropTypes.bool,
    updateConvertedPriceVisible: PropTypes.func
  }
  static propTypes = {
    updateProvince: () => {},
    updateTaxDetailsVisible: () => {},
    updateConvertedPriceVisible: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      provinceModalVisible: false
    }
  }

  getProvince(id) {
    return provinces.find(province => province.id === id)
  }

  updateProvince(province) {
    const { updateProvince } = this.props
    updateProvince(province.id)
    this.setState({ provinceModalVisible: false })
  }

  renderProvinceRow() {
    const { provinceId, intl } = this.props
    const province = provinceId && this.getProvince(provinceId)
    return (
      <AppRow
        key="province"
        label="Province"
        onPress={() => this.setState({ provinceModalVisible: true })}
      >
        <Caption>{province && province.name[intl.locale]}</Caption>
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
    const { taxDetailsVisible, updateTaxDetailsVisible } = this.props
    return (
      <AppRow key="taxes" label="Afficher le détail des taxes">
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
    const { convertedPriceVisible, updateConvertedPriceVisible } = this.props
    return (
      <AppRow key="convertedPrice" label="Convertir le prix total en euros">
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
    const { provinceId } = this.props
    const { provinceModalVisible } = this.state
    const province = provinceId && this.getProvince(provinceId)
    return (
      <AppContainer>
        <RowsContainer
          rows={[
            this.renderProvinceRow(),
            this.renderTaxesDetailRow(),
            this.renderConvertedPriceRow()
          ]}
        />
        <ProvinceDialog
          selectedProvince={province}
          provinces={provinces}
          visible={provinceModalVisible}
          onDismiss={province => this.updateProvince(province)}
        />
      </AppContainer>
    )
  }
}

export default injectIntl(Settings)
