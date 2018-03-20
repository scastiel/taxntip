import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import SelectionDialog from './SelectionDialog'

const currencyShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.objectOf(PropTypes.string).isRequired
})

class CurrencyDialog extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    selectedCurrency: currencyShape,
    currencies: PropTypes.arrayOf(currencyShape),
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
    const {
      selectedCurrency,
      currencies,
      onDismiss,
      visible,
      intl
    } = this.props
    return (
      <SelectionDialog
        visible={visible}
        selectedItem={selectedCurrency}
        items={currencies}
        onDismiss={onDismiss}
        renderItem={province => province.name[intl.locale]}
        getItemId={province => province.id}
        title={intl.formatMessage({ id: 'conversionCurrency' })}
      />
    )
  }
}

export default injectIntl(CurrencyDialog)
