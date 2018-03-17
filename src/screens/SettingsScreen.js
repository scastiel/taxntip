import React from 'react'
import PropTypes from 'prop-types'
import { Toolbar, ToolbarContent, ToolbarBackAction } from 'react-native-paper'
import { injectIntl } from 'react-intl'
import Settings from '../Settings'

const SettingsScreenHeader = injectIntl(({ intl, navigation }) => (
  <Toolbar>
    <ToolbarBackAction
      onPress={() => {
        navigation.pop()
      }}
    />
    <ToolbarContent title={intl.formatMessage({ id: 'settings' })} />
  </Toolbar>
))
SettingsScreenHeader.propTypes = {
  navigation: PropTypes.any
}

const SettingsScreen = ({ screenProps }) => <Settings {...screenProps} />
SettingsScreen.propTypes = {
  screenProps: PropTypes.any
}
SettingsScreen.navigationOptions = {
  // eslint-disable-next-line react/display-name
  header: props => <SettingsScreenHeader {...props} />
}

export default SettingsScreen
