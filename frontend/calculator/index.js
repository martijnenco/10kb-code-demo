import {maxValue, minValue, zeroImprovementScore} from "./checkCalculations";
// EFFECTS
// Algebra effects
import QuadraticEffect from "./effects/algebraEffects/quadraticEffect"

// ANALYTICS
// Trend analytics
import TrendByAdxIndications from "./analytics/trends/trendByAdxIndications";
import TrendByColorOfHeikenAshiCandlesticks from "./analytics/trends/trendByColorOfHeikenAshiCandlesticks";
import TrendByMovingAverages from "./analytics/trends/trendByMovingAverages";
import TrendByByNrtr from "./analytics/trends/trendByNrtr";
import TrendByPeaksOfZigZag from "./analytics/trends/trendByPeaksOfZigZag";
// Serializers
import TrendSerializer from "./analytics/serializers/trendSerializer";

// FUNCTIONS
// Algebra functions
import LinearFunction from "./functions/algebraFunctions/linearFunction";
import QuadraticFunction from "./functions/algebraFunctions/quadraticFunction";
// Trigonometry functions
import SineFunction from "./functions/trigonometryFunctions/sineFunction";

const LIST_OF_EFFECTS = [
  // Algebra effects
  QuadraticEffect,
];

const LIST_OF_ANALYTICS = [
  // TrendByAdxIndications,
  // TrendByColorOfHeikenAshiCandlesticks,
  TrendByMovingAverages,
  // TrendByByNrtr,
  TrendByPeaksOfZigZag,
];

const LIST_OF_ANALYTICAL_SERIALIZERS = [
  TrendSerializer,
];

const LIST_OF_FUNCTIONS = [
  // Algebra functions
  LinearFunction,
  QuadraticFunction,
  // Trigonometry functions
  SineFunction,
];

export default class Calculator {
  constructor(configuration = {}) {
    const t0 = performance.now();
    if (configuration.resource === null) throw "Resource not defined";
    if (configuration.method === null) throw "Method not defined";

    this.method = configuration.method;
    this.resource = configuration.resource;
    this.zeroImprovementScore = zeroImprovementScore(this.resource);
    this.maxValue = maxValue(this.resource);
    this.minValue = minValue(this.resource);

    // Calculate the effects.
    this.effects = LIST_OF_EFFECTS.map(Effect => {
      return new Effect(this).call();
    });

    // Calculate the analytics.
    this.analytics = LIST_OF_ANALYTICS.map(Analytic => {
      return new Analytic(this).call();
    });
    // Calculate the analytic serializers.
    this.analyticsSerializer = LIST_OF_ANALYTICAL_SERIALIZERS.map(AnalyticSerializer => {
      return new AnalyticSerializer(this).call();
    });

    // Calculate the functions.
    switch (this.method) {
      case 1:
        this.results = LIST_OF_FUNCTIONS.map((calculationFunction) => {
          return new calculationFunction(this).call();
        });
        break;
    }

    console.log(this);

    const t1 = performance.now();
    console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
  }
}
