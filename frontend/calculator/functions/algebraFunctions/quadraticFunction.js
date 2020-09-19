import BaseFunction from '../baseFunction';

export default class QuadraticFunction extends BaseFunction {
  constructor(props) {
    super(props);
  }

  call() {
    let percentageOfChangeEachIteration = Math.pow((this.maxValue.value / this.minValue.value), (1 / this.resource.length));

    this.computedData = this.resource.map((item, key) =>
      ({
        ...item,
        value: (this.minValue.value * Math.pow(percentageOfChangeEachIteration, key))
        // "improvement": 3.1234759100960185
        // Todo: replace 'key' for 'item.time', so it can comprehend better infrequency if time intervals in not ideal data
      }));

    return super.call();
  }
}
