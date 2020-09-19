import {checkImprovementScore} from "../checkCalculations";

export default class BaseFunction {
  improvementScore = 0;

  constructor(props) {
    this.zeroImprovementScore = props.zeroImprovementScore;
    this.resource = props.resource;
    this.maxValue = props.maxValue;
    this.minValue = props.minValue;
    this.computedData = this.resource;
    this.analytics = props.analytics;
    this.effects = props.effects;
  }

  call() {
    this.type =  this.constructor.name;
    this.improvementScore = this.getImprovementScore();
    this.improvement = this.getImprovement();
    return this;
  }

  getImprovementScore() {
    this.improvementScore = checkImprovementScore(this.resource, this.computedData);
  }

  getImprovement() {
    return this.zeroImprovementScore / this.improvementScore
  }
}
