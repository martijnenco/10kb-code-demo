export default class BaseAnalytic {

  constructor(props) {
    this.zeroImprovementScore = props.zeroImprovementScore;
    this.resource = props.resource;
    this.maxValue = props.maxValue;
    this.minValue = props.minValue;
    this.computedData = this.resource;
    this.analytics = props.analytics;
    this.effects = props.effects;
    this.typeOfAnalytic = null;
    this.typeOfTiming = 'instance';
  }

  call() {
    this.type = this.constructor.name;
    return this
  }
}