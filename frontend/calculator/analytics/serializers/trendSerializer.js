import BaseAnalytic from "../baseAnalytic";

export default class TrendSerializer extends BaseAnalytic {
  constructor(props) {
    super(props);
  }

  call() {
    console.log(this.analytics);

    this.analytics.map((resultedItemFromAnalytic, resultedIndexFromAnalytic) => {
      const nestedComputedData = [];
      if (resultedItemFromAnalytic.typeOfAnalytic === 'trend' && resultedItemFromAnalytic.typeOfTiming === 'event') {

        const numberOfEvents = resultedItemFromAnalytic.computedData.length;

        let arrayOfTimeBetweenEvents = resultedItemFromAnalytic.computedData.map((item, index) => {
          console.log(this.computedData[index - 1] ? item.time - this.computedData[index - 1].time : 0);

          return {
            timeSinceLastEvent: this.computedData[index - 1] ? item.time - this.computedData[index - 1].time : 0,
            time: item.time
          }
        });
        arrayOfTimeBetweenEvents = arrayOfTimeBetweenEvents.slice(1, arrayOfTimeBetweenEvents.length);

        const maxTimeBetweenEvents = arrayOfTimeBetweenEvents
          .reduce((accumulator, currentItem) => (accumulator >= currentItem.timeSinceLastEvent ? accumulator : currentItem.timeSinceLastEvent));
        const minTimeBetweenEvents = arrayOfTimeBetweenEvents
          .reduce((accumulator, currentItem) => (accumulator <= currentItem.timeSinceLastEvent ? accumulator : currentItem.timeSinceLastEvent));
        const avgTimeBetweenEvents = arrayOfTimeBetweenEvents
          .reduce((accumulator, currentItem) => (accumulator + currentItem.timeSinceLastEvent), 0) / arrayOfTimeBetweenEvents.length;

        // TODO remove the static timeFrame here and replace it with an 'effected' one.
        const timeFrame = 5;

        const arrayOfAvgTimeBetweenEvents = arrayOfTimeBetweenEvents.map((item, index) => {
          // const timeFrame = some effect or something

          const start = index - Math.ceil(timeFrame / 2) <= 0 ? 0 : index - Math.ceil(timeFrame / 2);
          const end = index + Math.ceil(timeFrame / 2) >= arrayOfTimeBetweenEvents.length - 1 ? arrayOfTimeBetweenEvents.length - 1 : index + Math.ceil(timeFrame / 2);
          const resourceSet = arrayOfTimeBetweenEvents.slice(start, end);
          console.log(start, end, resourceSet);
          const value = resourceSet.reduce((accumulator, currentItem) => (accumulator + currentItem.timeSinceLastEvent), 0) / resourceSet.length;

          return {
            ...item,
            value: value,
            trend: (value - minTimeBetweenEvents) / (maxTimeBetweenEvents - minTimeBetweenEvents)
          }
        });

        console.log(maxTimeBetweenEvents);
        console.log(minTimeBetweenEvents);
        console.log(avgTimeBetweenEvents);
        console.log(arrayOfAvgTimeBetweenEvents);

        this.computedData = arrayOfAvgTimeBetweenEvents;

      }

      // return;
    });

    return super.call();
  }
}