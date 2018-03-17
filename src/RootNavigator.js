import { StackNavigator } from 'react-navigation'
import MainScreen from './screens/MainScreen'
import SettingsScreen from './screens/SettingsScreen'

const RootNavigator = StackNavigator({
  main: { screen: MainScreen },
  settings: { screen: SettingsScreen }
})

export default RootNavigator
