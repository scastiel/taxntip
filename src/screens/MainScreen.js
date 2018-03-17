import React from 'react'
import PropTypes from 'prop-types'
import { Toolbar, ToolbarContent, ToolbarAction } from 'react-native-paper'
import { injectIntl } from 'react-intl'
import provinces from '../provinces'
import Main from '../Main'

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
  // eslint-disable-next-line react/display-name
  header: props => <MainScreenHeader {...props} />
}

export default MainScreen
