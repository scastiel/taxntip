import { lifecycle, compose, withStateHandlers, mapProps } from 'recompose'
import { omit } from 'ramda'

export default compose(
  withStateHandlers(
    { rates: {}, ratesLoaded: false },
    {
      updateRates: () => rates => ({
        rates,
        ratesLoaded: true
      })
    }
  ),
  lifecycle({
    async componentDidMount() {
      const rates = await fetchRates()
      this.props.updateRates(rates)
    }
  }),
  mapProps(omit(['updateRates']))
)

async function fetchRates() {
  /* global fetch */
  const res = await fetch('http://taxntip-api.now.sh/')
  return res.json()
}
