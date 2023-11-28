import React, { useEffect, useMemo, useState } from "react";
import request from "../../utils/request";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Scatter } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Bookings per day',
    },
  },
};

function Graph() {

  const [bookings, setBookings] = useState([]);
  const [scatterChart, setScatterChart] = useState(null);

  useEffect(() => {
    request("bookings")
      .then(data => {
        setBookings(data);
        console.log(data);
      });
  }, []);

  const data = useMemo(() => {
    const count = {};
    bookings.forEach(b => {
      if (count[b.day]) {
        count[b.day]++;
      }
      else {
        count[b.day] = 1;
      }
    });
    return {
      labels: Object.keys(count),
      datasets: [{
        label: "Bookings",
        data: Object.keys(count).map(key => count[key]),
        backgroundColor: 'rgba(59, 91, 208, 1)',
      }],
    };
  }, [bookings]);

  console.log("DATA", data);

  // Linear regression code using bookings data
  const x = data.labels.map(day => bookings.filter(b => b.day === day).length);
  const y = data.labels.map(day => data.datasets[0].data[data.labels.indexOf(day)]);

  const [slope, intercept] = useLinearRegression(x, y);

  const myfunc = (x) => slope * x + intercept;

  const mymodel = x.map(myfunc);

  // Destroy the previous scatter chart before rendering a new one
  useEffect(() => {
    if (scatterChart) {
      scatterChart.destroy();
    }
  }, [scatterChart]);

  return (
    <div>
      <div style={{ width: '100%', height: 400 }}>
        <Bar
          data={data}
          options={options}
        />
      </div>
      {/* Scatter plot and linear regression */}
      <div>
        <ScatterPlot x={x} y={y} mymodel={mymodel} setScatterChart={setScatterChart} />
      </div>
      {/* Second chart */}
      <div style={{ width: '100%', height: 400 }}>
        {/* Add your second chart code here */}
      </div>
    </div>
  );
}

// Helper component for scatter plot
function ScatterPlot({ x, y, mymodel, setScatterChart }) {
  useEffect(() => {
    const ctx = document.getElementById('scatter-chart');
    const scatterChart = new ChartJS(ctx, {
      type: 'scatter',
      data: {
        labels: x,
        datasets: [
          {
            label: 'Scatter Plot',
            data: y.map((value, index) => ({ x: x[index], y: value })),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Linear Regression',
            data: mymodel.map((value, index) => ({ x: x[index], y: value })),
            type: 'line',
            fill: false,
            borderColor: 'rgba(59, 91, 208, 1)',
          },
        ],
      },
    });
    setScatterChart(scatterChart);

    return () => {
      // Cleanup function to destroy the scatter chart
      scatterChart.destroy();
    };
  }, [x, y, mymodel, setScatterChart]);

  return (
    <div>
      <h1>Scatter Plot with Linear Regression</h1>
      <div>
        <canvas id="scatter-chart"></canvas>
      </div>
    </div>
  );
}

// Function for linear regression calculation
function useLinearRegression(x, y) {
  const n = x.length;

  const meanX = x.reduce((acc, val) => acc + val, 0) / n;
  const meanY = y.reduce((acc, val) => acc + val, 0) / n;

  const numerator = x.reduce((acc, val, index) => acc + (val - meanX) * (y[index] - meanY), 0);
  const denominator = x.reduce((acc, val) => acc + Math.pow(val - meanX, 2), 0);

  const slope = numerator / denominator;
  const intercept = meanY - slope * meanX;

  return [slope, intercept];
}

export default Graph;
