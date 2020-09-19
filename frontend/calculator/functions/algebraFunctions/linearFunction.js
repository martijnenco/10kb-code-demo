import BaseFunction from '../baseFunction';
import {phi} from 'mathjs';

export default class LinearFunction extends BaseFunction {
  constructor(props) {
    super(props);
  }

  call() {
    this.computedData = this.resource.map((item, key) => ({
      ...item,
      value: this.zeroImprovementScore * (key / (this.resource.length)) * phi
      // max "improvement" reachable ~: 2.219589312246585 TODO: above formula is a approximation.
      // Todo: replace 'key' for 'item.time', so it's can comprehend better infrequency if time intervals in not ideal data
    }));

    return super.call();
  }
}
