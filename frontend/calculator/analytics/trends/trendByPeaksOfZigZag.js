import BaseTrend from "./baseTrend";

export default class TrendByPeaksOfZigZag extends BaseTrend {
  constructor(props) {
    super(props);
    this.typeOfTiming = 'event';
  }

  call() {

    // TODO remove the static minimal swing here and replace it with an 'effected' one.
    const minSwingPercent = 2; // Note: this is 0.1% and not 10%

    let swingHigh = false;
    let swingLow = false;
    let indexHigh = {...this.resource[0]};
    let indexLow = {...this.resource[0]};

    this.computedData = this.resource.map(item => {
        if (item.value >= indexHigh.value) {
          indexHigh = Object.assign({}, item);
          if (!swingLow && ((indexHigh.value - indexLow.value) / indexLow.value * 100 >= minSwingPercent)) {
            swingHigh = false;
            swingLow = true;
            return {
              ...indexLow,
              trend: -1
            }
          }
          if (swingLow) indexLow = indexHigh;
        } else if (item.value <= indexLow.value) {
          indexLow = Object.assign({}, item);
          if (!swingHigh && ((indexHigh.value - indexLow.value) / indexLow.value * 100 >= minSwingPercent)) {
            swingHigh = true;
            swingLow = false;
            return {
              ...indexHigh,
              trend: 1
            }
          }
          if (swingHigh) indexHigh = indexLow;
        }
      }
    ).filter(item => (item));
    return super.call();
  }
}
