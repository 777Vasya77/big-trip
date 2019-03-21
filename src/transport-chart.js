import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {tripPoints} from './data';

const BAR_HEIGHT = 55;
const transportCtx = document.querySelector(`.statistic__transport`);
const pointsCount = tripPoints.length;

transportCtx.height = BAR_HEIGHT * pointsCount;

const transportData = tripPoints.reduce((prev, cur) => {
  const prop = `${cur.type.icon} ${cur.type.title.toUpperCase()}`;
  prev[prop] = (prev[prop] || 0) + 1;
  return prev;
}, {});

const transportChartData = {
  labels: [...new Set(Object.keys(transportData))],
  data: Object.values(transportData)
};

export default {
  render() {
    return new Chart(transportCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: transportChartData.labels,
        datasets: [{
          data: transportChartData.data,
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `${val}x`
          }
        },
        title: {
          display: true,
          text: `TRANSPORT`,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    });
  }
};
