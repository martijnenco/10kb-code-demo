import BaseTrend from "./baseTrend";

export default class TrendByMovingAverages extends BaseTrend {
  constructor(props) {
    super(props);
  }

  call() {
    // TODO remove the static timeFrame here and replace it with an 'effected' one.
    const timeFrame = 5;

    let lastTrend = 0;
    this.computedData = this.resource.map((item, index) => {
      // const timeFrame = some effect or something

      const start = index - Math.ceil(timeFrame / 2) <= 0 ? 0 : index - Math.ceil(timeFrame / 2);
      const end = index + Math.ceil(timeFrame / 2) >= this.resource.length - 1 ? this.resource.length - 1 : index + Math.ceil(timeFrame / 2);
      const resourceSet = this.resource.slice(start, end);
      const value = resourceSet.reduce((accumulator, currentItem) => (accumulator + currentItem.value), 0) / resourceSet.length;
      const resaveOfLastTrend = lastTrend;
      lastTrend = value;

      return {
        ...item,
        value: value,
        trend: resaveOfLastTrend >= value ? -1 : 1
      }
    });
    return super.call();
  }
}
