import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {BAR_HEIGHT} from '../../data';
import {clearChart} from "../../util";
const transportCtx = document.querySelector(`.statistic__transport`);

const getTransportData = (tripPoints) => {
  return tripPoints.reduce((prev, cur) => {
    const prop = `${cur.type.icon} ${cur.type.title.toUpperCase()}`;
    prev[prop] = (prev[prop] || 0) + 1;
    return prev;
  }, {});
};

export default {
  _chart: null,
  _labels: [],
  _data: [],
  _transportCtx: null,
  init(points) {
    clearChart(this._chart);

    const transportData = getTransportData(points);

    this._transportCtx = transportCtx;
    this._labels = [...new Set(Object.keys(transportData))];
    this._data = Object.values(transportData);

    transportCtx.height = BAR_HEIGHT * this._labels.length;

    this.render();
  },
  render() {
    const chart = new Chart(this._transportCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._labels,
        datasets: [{
          data: this._data,
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
    this._chart = chart;

    return chart;
  }
};
