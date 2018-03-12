import React from 'react'
import { StatusBar, AsyncStorage } from 'react-native'
import {
  DefaultTheme,
  Provider as PaperProvider,
  Colors
} from 'react-native-paper'
import { ScreenOrientation, Font, AppLoading, Asset, Util } from 'expo'
import { IntlProvider, addLocaleData } from 'react-intl'
import messages from './src/i18n'
import Main from './src/Main'

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
      return 'fr'
    }
    return 'en'
  }

  async loadLocale() {
    const locale = await this.getLocale()
    const hasIntl = global.Intl
    if (!hasIntl) global.Intl = require('intl')
    if (locale === 'fr') {
      if (!hasIntl) require('intl/locale-data/jsonp/fr.js')
      addLocaleData(require('react-intl/locale-data/fr'))
    } else {
      if (!hasIntl) require('intl/locale-data/jsonp/en.js')
      addLocaleData(require('react-intl/locale-data/en'))
    }
    await this.setState({ locale })
  }

  async loadStateFromStorage() {
    const savedState = (await Promise.all(
      [
        'amount',
        'provinceId',
        'tip',
        'taxDetailsVisible',
        'showConvertedPrice'
      ].map(async key => {
        const value = await AsyncStorage.getItem(key)
        return { key, value: value ? JSON.parse(value) : null }
      })
    )).reduce(
      (acc, { key, value }) =>
        value === null ? acc : { ...acc, [key]: value },
      {}
    )
    await this.setState({ savedState })
  }

  async saveStateInStorage(state) {
    ;['amount', 'tip', 'taxDetailsVisible', 'showConvertedPrice'].forEach(
      key => {
        AsyncStorage.setItem(key, JSON.stringify(state[key]))
      }
    )
    AsyncStorage.setItem('provinceId', JSON.stringify(state.province.id))
  }

  async loadAssets() {
    await Promise.all([
      this.loadLocale(),
      this.loadStateFromStorage(),
      Asset.fromModule(require('./assets/background.jpg')).downloadAsync(),
      Font.loadAsync({
        Roboto: require('./assets/roboto/Roboto-Regular.ttf'),
        RobotoMedium: require('./assets/roboto/Roboto-Medium.ttf'),
        MaterialIcons: require('./node_modules/react-native-vector-icons/Fonts/MaterialIcons.ttf')
      })
    ])
  }

  render() {
    const { savedState, assetsLoaded, locale } = this.state
    return assetsLoaded ? (
      <PaperProvider theme={theme}>
        <IntlProvider locale={locale} messages={messages[locale]}>
          <Main
            {...savedState}
            saveStateInStorage={state => this.saveStateInStorage(state)}
          />
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
