import React from 'react'
import { StatusBar } from 'react-native'
import {
  DefaultTheme,
  Provider as PaperProvider,
  Colors
} from 'react-native-paper'
import { ScreenOrientation, Font, AppLoading, Asset, Util } from 'expo'
import { IntlProvider, addLocaleData } from 'react-intl'
import messages from './src/i18n'
import RootNavigator from './src/RootNavigator'
import { Provider as StateProvider } from './src/StateContext'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.red800,
    accent: Colors.blue500
  }
}

// Uncomment to clear settings:
// AsyncStorage.clear()

export default class App extends React.Component {
  state = {
    assetsLoaded: false
  }

  async componentDidMount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT_UP)
    StatusBar.setBarStyle('light-content')
  }

  async getLocale() {
    const locale = await Util.getCurrentLocaleAsync()
    if (
      locale === 'fr' ||
      locale.startsWith('fr-') ||
      locale.startsWith('fr_')
    ) {
      return 'fr-CA'
    }
    return 'en-CA'
  }

  async loadLocale() {
    const locale = await this.getLocale()
    const hasIntl = global.Intl
    if (!hasIntl) global.Intl = require('intl')
    if (locale === 'fr-CA') {
      if (!hasIntl) require('intl/locale-data/jsonp/fr-CA')
      addLocaleData(require('react-intl/locale-data/fr'))
    } else {
      if (!hasIntl) require('intl/locale-data/jsonp/en-CA')
      addLocaleData(require('react-intl/locale-data/en'))
    }
    await this.setState({ locale })
  }

  async loadAssets() {
    await Promise.all([
      this.loadLocale(),
      Asset.fromModule(require('./assets/background.jpg')).downloadAsync(),
      Font.loadAsync({
        Roboto: require('./assets/roboto/Roboto-Regular.ttf'),
        RobotoMedium: require('./assets/roboto/Roboto-Medium.ttf'),
        MaterialIcons: require('./node_modules/react-native-vector-icons/Fonts/MaterialIcons.ttf'),
        'Material Icons': require('./node_modules/react-native-vector-icons/Fonts/MaterialIcons.ttf')
      })
    ])
  }

  render() {
    const { assetsLoaded, locale } = this.state

    return assetsLoaded ? (
      <PaperProvider theme={theme}>
        <IntlProvider locale={locale} messages={messages[locale]}>
          <StateProvider>
            <RootNavigator />
          </StateProvider>
        </IntlProvider>
      </PaperProvider>
    ) : (
      <AppLoading
        startAsync={() => this.loadAssets()}
        onFinish={() => this.setState({ assetsLoaded: true })}
        onError={console.warn}
      />
    )
  }
}
