import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { Toolbar, ToolbarContent, ToolbarAction } from 'react-native-paper'

class AppToolbar extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    province: PropTypes.any.isRequired,
    onProvinceButtonPressed: PropTypes.func
  }
  static defaultProps = {
    onProvinceButtonPressed: () => {}
  }

  render() {
    const { intl, province, onProvinceButtonPressed } = this.props
    return (
      <Toolbar>
        <ToolbarContent
          title={intl.formatMessage({ id: 'title' })}
          subtitle={province.name[intl.locale]}
        />
        <ToolbarAction icon="my-location" onPress={onProvinceButtonPressed} />
      </Toolbar>
    )
  }
}

export default injectIntl(AppToolbar)
