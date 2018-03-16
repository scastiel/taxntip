**Taxes and tips in Canada** is a mobile application that enables you from a price excluding taxes to calculate the final price you’re going to pay. You can also specify you want to add a tip if you wish.

<center>

<p align="center"><a href="https://itunes.apple.com/us/app/taxes-et-pourboires-au-canada/id1358009518" rel="nofollow"><img width="300" src="https://github.com/scastiel/taxntip/raw/master/assets/stores-icons/app-store.png" alt="Get it on the App Store" style="max-width:100%;"></a> <a href="https://play.google.com/store/apps/details?id=me.castiel.taxntip" rel="nofollow"><img width="300" src="https://github.com/scastiel/taxntip/raw/master/assets/stores-icons/play-store.png" alt="Get it on Google Play" style="max-width:100%;"></a></p>

</center>

## Features

* [x] Calculate final price from the price excluding taxes
* [x] Add a tip (possible percentages: 15, 20, 25 %)
* [x] Select any of Canada’s provinces
* [x] Get the detail of taxes (provincial and from Canada)
* [x] Price conversion to Euros (the conversion rate is refreshed every day)
* [x] Available locales: French, English (Canada)

## Future

* [ ] Specify other tip percentages
* [ ] Specify other conversion than Euros
* [ ] Add content: when should I leave a tip?

## Technical stack

The application is built with:

* [React](https://reactjs.org/)
* [React Native](https://facebook.github.io/react-native/)
* [React Native Paper](https://callstack.github.io/react-native-paper/)
* [Expo](https://expo.io/)

The conversion to Euros is made with [Open Exchange Rates](https://openexchangerates.org/)’s API, going through a [small proxy API](https://github.com/scastiel/taxntip-api) to limit the number of requests.

## Contribute

Feel free to request features or report bugs by [submitting an issue](https://gitlab.com/scastiel/taxntip/issues) or even pull-requests if you want to contribute in any way 😊.

## Licence

Published under the GNU GPL v3 (see [LICENSE](https://gitlab.com/scastiel/taxntip/blob/master/LICENSE)).
