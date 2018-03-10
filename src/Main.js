import React, { Component, Fragment } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Provider as PaperProvider, TouchableRipple } from 'react-native-paper'
import AmountText from './AmountText'

class Main extends Component {
  state = {
    amount: 1000,
    amountText: '1000',
    editMode: false
  }

  getTaxes() {
    return parseFloat(this.state.amount) * 0.15
  }

  getNetPrice() {
    return parseFloat(this.state.amount) + this.getTaxes()
  }

  updateAmount() {
    this.setState({
      amount: parseFloat(this.state.amountText),
      editMode: false
    })
  }

  render() {
    const { editMode } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>Prix hors taxes</Text>
          {editMode ? (
            <Fragment>
              <TextInput
                ref={ref => {
                  if (ref) {
                    ref.focus()
                  }
                }}
                value={this.state.amountText}
                keyboardType="numeric"
                returnKeyType="done"
                onChangeText={text => this.setState({ amountText: text })}
                onBlur={() => this.updateAmount()}
                style={styles.amountInput}
              />
              <Text style={styles.currency}> $</Text>
            </Fragment>
          ) : (
            <TouchableRipple onPress={() => this.setState({ editMode: true })}>
              <AmountText style={styles.amount} amount={this.state.amount} />
            </TouchableRipple>
          )}
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Taxes</Text>
          <AmountText style={styles.amount} amount={this.getTaxes()} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Prix total</Text>
          <AmountText style={styles.amount} amount={this.getNetPrice()} />
        </View>
      </View>
    )
  }
}

const fontProps = {
  fontSize: 20
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10
  },
  amountInput: {
    textAlign: 'right',
    flex: 1,
    ...fontProps
  },
  currency: {
    ...fontProps
  },
  amount: {
    ...fontProps
  },
  row: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row'
  },
  label: {
    flex: 1,
    ...fontProps
  }
})

export default Main
