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
import { injectIntl, intlShape } from 'react-intl'

class TipDialog extends Component {
  static propTypes = {
    tip: PropTypes.number,
    visible: PropTypes.bool,
    onDismiss: PropTypes.func,
    intl: intlShape.isRequired
  }
  static defaultProps = {
    tip: 0,
    visible: false,
    onDismiss: () => {}
  }

  render() {
    const { tip, onDismiss, visible, intl } = this.props
    return (
      <Dialog
        style={styles.dialog}
        visible={visible}
        onDismiss={() => onDismiss(tip)}
      >
        <DialogTitle>{intl.formatMessage({ id: 'chooseTip' })}</DialogTitle>
        <DialogContent>
          {[
            { label: intl.formatMessage({ id: 'noTip' }), value: 0 },
            { label: '15 %', value: 0.15 },
            { label: '20 %', value: 0.2 },
            { label: '25 %', value: 0.25 }
          ].map(({ label, value }) => (
            <TouchableRipple key={value} onPress={() => onDismiss(value)}>
              <View style={styles.row}>
                <Paragraph style={styles.label}>{label}</Paragraph>
                <RadioButton value={value} checked={tip === value} />
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

export default injectIntl(TipDialog)
