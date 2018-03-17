import React from 'react'
import PropTypes from 'prop-types'
import { StackNavigator } from 'react-navigation'
import Main from './Main'
import Settings from './Settings'
import { injectIntl } from 'react-intl'
import {
  Toolbar,
  ToolbarContent,
  ToolbarAction,
  ToolbarBackAction
} from 'react-native-paper'
import provinces from './provinces'

const MainScreenHeader = injectIntl(
  ({ intl, navigation, screenProps: { provinceId } }) => (
    <Toolbar>
      <ToolbarContent
        title={intl.formatMessage({ id: 'title' })}
        subtitle={
          provinceId &&
          provinces.find(p => p.id === provinceId).name[intl.locale]
        }
      />
      <ToolbarAction
        icon="settings"
        onPress={() => navigation.push('settings')}
      />
    </Toolbar>
  )
)
MainScreenHeader.propTypes = {
  navigation: PropTypes.any,
  screenProps: PropTypes.shape({
    provinceId: PropTypes.string
  })
}

const MainScreen = ({ screenProps }) => <Main {...screenProps} />
MainScreen.propTypes = {
  screenProps: PropTypes.any
}
MainScreen.navigationOptions = {
  header: props => <MainScreenHeader {...props} />
}

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
  header: props => <SettingsScreenHeader {...props} />
}

const RootNavigator = StackNavigator({
  main: { screen: MainScreen },
  settings: { screen: SettingsScreen }
})

export default RootNavigator
