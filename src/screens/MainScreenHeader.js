import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Toolbar, ToolbarContent, ToolbarAction } from 'react-native-paper'
import { injectIntl, intlShape } from 'react-intl'
import provinces from '../provinces'
import { compose } from 'recompose'
import { withState } from '../StateContext'
import { pick } from 'ramda'

class MainScreenHeader extends Component {
  static propTypes = {
    intl: intlShape,
    navigation: PropTypes.any,
    provinceId: PropTypes.string
  }

  render() {
    const { intl, navigation, provinceId } = this.props
    return (
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
  }
}

export default compose(withState(pick(['provinceId'])), injectIntl)(
  MainScreenHeader
)
