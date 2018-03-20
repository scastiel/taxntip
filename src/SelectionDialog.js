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

class SelectionDialog extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    selectedItem: PropTypes.any,
    items: PropTypes.array,
    onDismiss: PropTypes.func,
    renderItem: PropTypes.func,
    getItemId: PropTypes.func,
    title: PropTypes.string
  }
  static defaultProps = {
    visible: false,
    selectedItem: null,
    items: [],
    onDismiss: () => {},
    renderItem: item => item,
    getItemId: item => item.id,
    title: ''
  }

  render() {
    const {
      selectedItem,
      items,
      onDismiss,
      visible,
      title,
      renderItem,
      getItemId
    } = this.props
    return (
      <Dialog
        style={styles.dialog}
        visible={visible}
        onDismiss={() => onDismiss(selectedItem)}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {items.map(item => (
            <TouchableRipple
              key={getItemId(item)}
              onPress={() => onDismiss(item)}
            >
              <View style={styles.row}>
                <Paragraph style={styles.label}>{renderItem(item)}</Paragraph>
                <RadioButton
                  value={getItemId(item)}
                  checked={selectedItem === item}
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

export default SelectionDialog
