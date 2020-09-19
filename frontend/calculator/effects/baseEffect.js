export default class BaseEffect {
  constructor(props) {
    this.zeroImprovementScore = props.zeroImprovementScore;
    this.resource = props.resource;
    this.maxValue = props.maxValue;
    this.minValue = props.minValue;
    this.computedData = this.resource;
  }

  call() {
    this.type = this.constructor.name;
    return this;
  }
}