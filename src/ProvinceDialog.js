import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import {
  TouchableRipple,
  Paragraph,
  Dialog,
  DialogContent,
  DialogTitle,
  RadioButton
} from 'react-native-paper'

const provinceShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  tax_province: PropTypes.number.isRequired,
  tax_canada: PropTypes.number.isRequired
})

class ProvinceDialog extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    selectedProvince: provinceShape,
    provinces: PropTypes.arrayOf(provinceShape),
    onDismiss: PropTypes.func
  }
  static defaultProps = {
    visible: false,
    selectedProvince: null,
    provinces: [],
    onDismiss: () => {}
  }

  render() {
    const { selectedProvince, provinces, onDismiss, visible } = this.props
    return (
      <Dialog
        style={styles.dialog}
        visible={visible}
        onDismiss={() => onDismiss(selectedProvince)}
      >
        <DialogTitle>Province</DialogTitle>
        <DialogContent>
          {provinces.map(province => (
            <TouchableRipple
              key={province.name}
              onPress={() => onDismiss(province)}
            >
              <View style={styles.row}>
                <Paragraph style={styles.label}>{province.name}</Paragraph>
                <RadioButton
                  value={province.name}
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

export default ProvinceDialog
