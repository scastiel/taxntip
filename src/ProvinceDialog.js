import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import {
  TouchableRipple,
  Paragraph,
  Dialog,
  DialogContent,
  DialogTitle,
  RadioButton
} from 'react-native-paper'

const provinceShape = PropTypes.shape({
  name: PropTypes.objectOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
  tax_province: PropTypes.number.isRequired,
  tax_canada: PropTypes.number.isRequired
})

class ProvinceDialog extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    selectedProvince: provinceShape,
    provinces: PropTypes.arrayOf(provinceShape),
    onDismiss: PropTypes.func,
    intl: intlShape.isRequired
  }
  static defaultProps = {
    visible: false,
    selectedProvince: null,
    provinces: [],
    onDismiss: () => {}
  }

  render() {
    const { selectedProvince, provinces, onDismiss, visible, intl } = this.props
    return (
      <Dialog
        style={styles.dialog}
        visible={visible}
        onDismiss={() => onDismiss(selectedProvince)}
      >
        <DialogTitle>{intl.formatMessage({ id: 'province' })}</DialogTitle>
        <DialogContent>
          {provinces.map(province => (
            <TouchableRipple
              key={province.id}
              onPress={() => onDismiss(province)}
            >
              <View style={styles.row}>
                <Paragraph style={styles.label}>
                  {province.name[intl.locale]}
                </Paragraph>
                <RadioButton
                  value={province.id}
                  checked={selectedProvince === province}
                />
              </View>
            </TouchableRipple>
          ))}
        </DialogContent>
      </Dialog>
    )
  }
}

const styles = StyleSheet.create({
  dialog: {
    alignSelf: 'center',
    width: '90%',
    maxWidth: 400
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    flex: 1
  }
})

export default injectIntl(ProvinceDialog)
