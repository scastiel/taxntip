import React from 'react'
import { StatusBar } from 'react-native'
import {
  DefaultTheme,
  Provider as PaperProvider,
  Colors
} from 'react-native-paper'
import { ScreenOrientation, Font, AppLoading, Asset, Util } from 'expo'
import { IntlProvider, addLocaleData } from 'react-intl'
import frLocaleData from 'react-intl/locale-data/fr'
import enLocaleData from 'react-intl/locale-data/en'
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

  async loadAssets() {
    const locale = await this.getLocale()
    if (locale === 'fr') {
      addLocaleData(frLocaleData)
    } else {
      addLocaleData(enLocaleData)
    }
    await this.setState({ locale })

    await Promise.all([
      Asset.fromModule(require('./assets/background.jpg')).downloadAsync(),
      Font.loadAsync({
        Roboto: require('./assets/roboto/Roboto-Regular.ttf'),
        RobotoMedium: require('./assets/roboto/Roboto-Medium.ttf')
      })
    ])
  }

  render() {
    return this.state.assetsLoaded ? (
      <PaperProvider theme={theme}>
        <IntlProvider
          locale={this.state.locale}
          messages={messages[this.state.locale]}
        >
          <Main />
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
