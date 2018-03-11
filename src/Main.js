import React, { Component, Fragment } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {
  Provider as PaperProvider,
  TouchableRipple,
  Toolbar,
  ToolbarContent,
  Button,
  Paragraph,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  RadioButton,
  Caption,
  Divider,
  Colors,
  Paper
} from 'react-native-paper'
import AmountText from './AmountText'
import AmountInput from './AmountInput'

class Main extends Component {
  state = {
    amount: 30,
    editMode: false,
    tipModalVisible: false,
    tip: 0
  }

  getTaxes() {
    return parseFloat(this.state.amount) * 0.15
  }

  getNetPrice() {
    return parseFloat(this.state.amount) + this.getTaxes() + this.getTip()
  }

  getTip() {
    return this.state.tip * this.state.amount
  }

  updateAmount(amount) {
    this.setState({ amount, editMode: false })
  }

  render() {
    const { amount, amountText, editMode, tip, tipModalVisible } = this.state
    return (
      <Fragment>
        <Toolbar>
          <ToolbarContent
            title="Taxes et pourboires"
            subtitle="Québec, Canada"
          />
        </Toolbar>
        <View style={styles.container}>
          <Paper style={styles.paper}>
            <TouchableRipple
              onPress={() =>
                this.state.editMode || this.setState({ editMode: true })
              }
            >
              <View style={styles.row}>
                <Paragraph style={styles.label}>Prix hors taxes</Paragraph>
                {editMode ? (
                  <Fragment>
                    <AmountInput
                      innerRef={ref => ref && ref.focus()}
                      amount={amount}
                      onBlur={amount => this.updateAmount(amount)}
                      style={styles.amountInput}
                    />
                    <Text style={styles.currency}> $</Text>
                  </Fragment>
                ) : (
                  <AmountText style={styles.amount} amount={amount} />
                )}
              </View>
            </TouchableRipple>
            <Divider />
            <View style={styles.row}>
              <Paragraph style={styles.secondaryLabel}>Taxes (15 %)</Paragraph>
              <AmountText
                style={styles.secondaryAmount}
                amount={this.getTaxes()}
              />
            </View>
            {tip > 0 && (
              <Fragment>
                <Divider />
                <TouchableRipple
                  onPress={() => this.setState({ tipModalVisible: true })}
                >
                  <View style={styles.row}>
                    <Paragraph style={styles.secondaryLabel}>
                      Pourboire ({tip * 100} %)
                    </Paragraph>
                    <AmountText
                      style={styles.secondaryAmount}
                      amount={this.getTip()}
                    />
                  </View>
                </TouchableRipple>
              </Fragment>
            )}
            <Divider />
            <View style={styles.row}>
              <Paragraph style={styles.label}>Prix total</Paragraph>
              <AmountText style={styles.amount} amount={this.getNetPrice()} />
            </View>
          </Paper>
          {tip === 0 && (
            <Button
              primary
              icon="add-circle"
              style={styles.addTipButton}
              onPress={() => this.setState({ tipModalVisible: true })}
            >
              Ajouter un pourboire
            </Button>
          )}
        </View>
        <Dialog
          visible={tipModalVisible}
          onDismiss={() => this.setState({ tipModalVisible: false })}
        >
          <DialogTitle>Choisir le pourboire</DialogTitle>
          <DialogContent>
            {[
              { label: 'Aucun pourboire', value: 0 },
              { label: '15 %', value: 0.15 },
              { label: '20 %', value: 0.2 },
              { label: '25 %', value: 0.25 }
            ].map(({ label, value }) => (
              <TouchableRipple
                key={value}
                onPress={() => {
                  this.setState({ tip: value, tipModalVisible: false })
                }}
              >
                <View style={styles.tipModalRow}>
                  <Paragraph style={styles.tipModalLabel}>{label}</Paragraph>
                  <RadioButton
                    value="Aucun pourboire"
                    checked={tip === value}
                  />
                </View>
              </TouchableRipple>
            ))}
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

const fontProps = {
  fontSize: 18
}

const amountFontProps = {
  fontFamily: 'Menlo',
  fontSize: 18
}

const labelProps = {
  flex: 1,
  ...fontProps
}

const amountProps = {
  textAlign: 'right',
  width: 100,
  ...amountFontProps
}

const secondaryProps = {
  color: 'grey'
  // fontStyle: 'italic'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueGrey50
  },
  title: {
    fontSize: 24
  },
  paper: {
    margin: 10,
    elevation: 2
  },
  amountInput: {
    textAlign: 'right',
    flex: 1,
    ...amountFontProps
  },
  currency: {
    ...fontProps
  },
  amount: {
    ...amountProps
  },
  secondaryAmount: {
    ...secondaryProps,
    ...amountProps
  },
  tipModalRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tipModalLabel: {
    flex: 1
  },
  row: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grey50
  },
  label: {
    ...labelProps
  },
  secondaryLabel: {
    ...secondaryProps,
    ...labelProps
  },
  hint: {
    ...fontProps
  },
  addTipButton: {
    marginTop: 20,
    alignSelf: 'center'
  }
})

export default Main
