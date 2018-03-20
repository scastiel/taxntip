import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Toolbar, ToolbarContent, ToolbarBackAction } from 'react-native-paper'
import { injectIntl, intlShape } from 'react-intl'

class SettingsScreenHeader extends Component {
  static propTypes = {
    intl: intlShape,
    navigation: PropTypes.any
  }

  render() {
    const { intl, navigation } = this.props
    return (
      <Toolbar>
        <ToolbarBackAction
          onPress={() => {
            navigation.pop()
          }}
        />
        <ToolbarContent title={intl.formatMessage({ id: 'settings' })} />
      </Toolbar>
    )
  }
}

export default injectIntl(SettingsScreenHeader)
