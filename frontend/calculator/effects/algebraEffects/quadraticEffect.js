import BaseEffect from "./../baseEffect"

export default class QuadraticEffect extends BaseEffect {
  constructor(props) {
    super(props);
    this.highestEffectedValue = this.getHighestValue();
  }

  call() {
    let percentageOfChangeEachIteration = Math.pow((this.maxValue.value / this.minValue.value), (1 / this.resource.length));

    this.computedData = this.resource.map((item, key) =>
      ({
        ...item,
        value: (this.minValue.value * Math.pow(percentageOfChangeEachIteration, key)) / this.highestEffectedValue.value
        // Todo: replace 'key' for 'item.time', so it can comprehend better infrequency if time intervals in not ideal data
      }));

    return super.call();
  }

  getHighestValue() {
    let percentageOfChangeEachIteration = Math.pow((this.maxValue.value / this.minValue.value), (1 / this.resource.length));

    return {
      ...this.maxValue,
      value: (this.minValue.value * Math.pow(percentageOfChangeEachIteration, this.resource.length - 1))
    };
  }
}