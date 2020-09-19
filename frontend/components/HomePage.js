import React from 'react';
import Calculator from "../calculator";
import LineChart from "recharts/lib/chart/LineChart";
import XAxis from "recharts/lib/cartesian/XAxis";
import YAxis from "recharts/lib/cartesian/YAxis";
import CartesianGrid from "recharts/lib/cartesian/CartesianGrid";
import Tooltip from "recharts/lib/component/Tooltip";
import Legend from "recharts/lib/component/Legend";
import Line from "recharts/lib/cartesian/Line";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    let goldPrices = require('../resources/dataGoldPrices');

    goldPrices = goldPrices.map(item => {
      return {
        value: item.value,
        time: new Date(item.time).getTime() / 1000,
      }
    });

    const calculator = new Calculator({
      resource: goldPrices,
      method: 1
    });

    this.state = {
      calculator,
    };
  }

  getRandomColor() {
    return `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, 0)}`
  }

  render() {
    return (
      <div>
        {/*<pre>{JSON.stringify(this.state.calculator, null, 2)}</pre>*/}

        <div>
          <p>Analytic:</p>
          <LineChart width={900} height={250}>
            <XAxis dataKey="time" type={'number'}/>
            <YAxis dataKey="value"/>
            <CartesianGrid strokeDasharray="1 1"/>
            <Tooltip/>
            <Legend/>
            <Line dataKey="value" data={this.state.calculator.resource} name={"goldPrices"} key={"goldPrices"}
                  stroke={this.getRandomColor()}/>
            {this.state.calculator.analytics.map(s => (
              <Line dataKey="value" data={s.computedData} name={s.type} key={s.type} stroke={this.getRandomColor()}/>
            ))}
          </LineChart>
          <LineChart width={900} height={250}>
            <XAxis dataKey="time" type={'number'}/>
            <YAxis dataKey="trend"/>
            <CartesianGrid strokeDasharray="1 1"/>
            <Tooltip/>
            <Legend/>
            {this.state.calculator.analytics.map(s => (
              <Line dataKey="trend" data={s.computedData} name={s.type} key={s.type} stroke={this.getRandomColor()}/>
            ))}
            {this.state.calculator.analyticsSerializer.map(s => (
              <Line dataKey="trend" data={s.computedData} name={s.type} key={s.type} stroke={this.getRandomColor()}/>
            ))}
          </LineChart>

          <p>Effect:</p>
          <LineChart width={900} height={250}>
            <XAxis dataKey="time" type={'number'}/>
            <YAxis />
            <CartesianGrid strokeDasharray="1 1"/>
            <Tooltip/>
            <Legend/>
            {this.state.calculator.effects.map(s => (
              <Line dataKey="value" data={s.computedData} name={s.type} key={s.type} stroke={this.getRandomColor()}/>
            ))}
          </LineChart>

          <p>Result:</p>
          <LineChart width={900} height={250}>
            <XAxis dataKey="time" type={'number'}/>
            <YAxis />
            <CartesianGrid strokeDasharray="1 1"/>
            <Tooltip/>
            <Legend/>
            <Line dataKey="value" data={this.state.calculator.resource} name={"goldPrices"} key={"goldPrices"}
                  stroke={this.getRandomColor()}/>
            {this.state.calculator.results.map(s => (
              <Line dataKey="value" data={s.computedData} name={s.type} key={s.type} stroke={this.getRandomColor()}/>
            ))}
          </LineChart>
        </div>
      </div>
    );
  }
}

export default HomePage;
