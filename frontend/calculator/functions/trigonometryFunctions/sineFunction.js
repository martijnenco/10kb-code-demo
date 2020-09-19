import BaseFunction from '../baseFunction';

export default class SineFunction extends BaseFunction {
  constructor(props) {
    super(props);
  }

  call() {
    this.computedData = this.resource.map((item, key) =>
      ({
        ...item,
        // value: math.sin()
        // Todo: replace 'key' for 'item.time', so it can comprehend better infrequency if time intervals in not ideal data
      }));

    return super.call();
  }
}
