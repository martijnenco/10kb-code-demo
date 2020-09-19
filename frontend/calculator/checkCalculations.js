export function zeroImprovementScore(data) {
  return average(data)
}

export function checkImprovementScore(oldData, newData) {
  if (oldData.length !== newData.length) console.warn("Old data and new data does not have the same length");

  let data = [];
  for (let i = 0; i < newData.length; i++) {
    data.push({
      ...newData[i],
      value: Math.abs(oldData[i].value - newData[i].value)
    })
  }
  return average(data)
}

export function maxValue(data) {
  let tempValue = {
    value: 0
  };
  data.map((item, key) => {
    if (item.value >= tempValue.value) {
      tempValue = item;
      tempValue.key = key
    }
  });
  return tempValue;
}

export function minValue(data) {
  let tempValue = {
    value: Infinity
  };
  data.map((item, key) => {
    if (item.value <= tempValue.value) {
      tempValue = item;
      tempValue.key = key
    }
  });
  return tempValue;
}

function average(data) {
  return data.reduce((a, b) => (a + b.value), 0) / data.length;
}