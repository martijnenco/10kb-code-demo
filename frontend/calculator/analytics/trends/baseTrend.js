import BaseAnalytic from "../baseAnalytic";

export default class BaseTrend extends BaseAnalytic {
  constructor(props) {
    super(props);
    this.typeOfAnalytic = 'trend';
  }

  call() {
    return super.call();
  }
}