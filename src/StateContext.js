import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AsyncStorage } from 'react-native'
import createReactContext from 'create-react-context'

const StateContext = createReactContext()

export class Provider extends Component {
  static propTypes = {
    children: PropTypes.any
  }

  state = {
    loaded: false
  }

  static savedStateWithDefaultValues = {
    amount: 28,
    provinceId: 'QC',
    tip: 0,
    taxDetailsVisible: true,
    convertedPriceVisible: true,
    conversionCurrency: 'EUR'
  }

  componentWillMount() {
    this.loadStateFromStorage()
  }

  valueUpdater = name => value => {
    this.setState({ [name]: value })
    AsyncStorage.setItem(name, JSON.stringify(value))
  }

  async loadStateFromStorage() {
    const savedState = (await Promise.all(
      Object.entries(Provider.savedStateWithDefaultValues).map(
        async ([key, defaultValue]) => {
          const value = await AsyncStorage.getItem(key)
          return { key, value: value ? JSON.parse(value) : defaultValue }
        }
      )
    )).reduce(
      (acc, { key, value }) =>
        value === null ? acc : { ...acc, [key]: value },
      {}
    )
    await this.setState({
      ...savedState,
      loaded: true
    })
  }

  actions = {
    updateProvince: this.valueUpdater('provinceId'),
    updateAmount: this.valueUpdater('amount'),
    updateTip: this.valueUpdater('tip'),
    updateTaxDetailsVisible: this.valueUpdater('taxDetailsVisible'),
    updateConvertedPriceVisible: this.valueUpdater('convertedPriceVisible'),
    updateConversionCurrency: this.valueUpdater('conversionCurrency')
  }

  render() {
    return (
      <StateContext.Provider
        value={{ state: this.state, actions: this.actions }}
      >
        {this.props.children}
      </StateContext.Provider>
    )
  }
}

export const withState = (
  stateSelector = () => {},
  actionSelector = () => {}
) => Comp => {
  const compWithState = props => (
    <StateContext.Consumer>
      {({ state, actions }) => (
        <Comp
          {...props}
          {...stateSelector(state)}
          {...actionSelector(actions)}
        />
      )}
    </StateContext.Consumer>
  )
  return compWithState
}
