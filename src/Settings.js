import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import AppContainer from './AppContainer'
import provinces from './provinces'
import ProvinceDialog from './ProvinceDialog'
import { injectIntl } from 'react-intl'
import { Button, Paragraph, Switch, TouchableRipple } from 'react-native-paper'

class Settings extends Component {
  static propTypes = {}

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

  render() {
    const {
      provinceId,
      taxDetailsVisible,
      updateTaxDetailsVisible,
      convertedPriceVisible,
      updateConvertedPriceVisible,
      intl
    } = this.props
    const { provinceModalVisible } = this.state
    const province = provinceId && this.getProvince(provinceId)
    return (
      <AppContainer>
        <Text>Province: {province && province.name[intl.locale]}</Text>
        <Button
          onPress={() => {
            this.setState({ provinceModalVisible: true })
          }}
        >
          Edit
        </Button>
        <ProvinceDialog
          selectedProvince={province}
          provinces={provinces}
          visible={provinceModalVisible}
          onDismiss={province => this.updateProvince(province)}
        />
        <TouchableRipple
          onPress={() => updateTaxDetailsVisible(!taxDetailsVisible)}
        >
          <View style={{ flexDirection: 'row' }}>
            <View pointerEvents="none">
              <Switch value={taxDetailsVisible} />
            </View>
            <Paragraph>Afficher le détail des taxes</Paragraph>
          </View>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => updateConvertedPriceVisible(!convertedPriceVisible)}
        >
          <View style={{ flexDirection: 'row' }}>
            <View pointerEvents="none">
              <Switch value={convertedPriceVisible} />
            </View>
            <Paragraph>Afficher le prix total converti en euros</Paragraph>
          </View>
        </TouchableRipple>
      </AppContainer>
    )
  }
}

export default injectIntl(Settings)
