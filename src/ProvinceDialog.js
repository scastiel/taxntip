import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import SelectionDialog from './SelectionDialog'

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
      <SelectionDialog
        visible={visible}
        selectedItem={selectedProvince}
        items={provinces}
        onDismiss={onDismiss}
        renderItem={province => province.name[intl.locale]}
        getItemId={province => province.id}
        title={intl.formatMessage({ id: 'province' })}
      />
    )
  }
}

export default injectIntl(ProvinceDialog)
