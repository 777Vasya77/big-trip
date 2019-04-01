import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const getMoneyData = (tripPoints) => {
  return tripPoints.reduce((prev, cur) => {
    const prop = `${cur.type.icon} ${cur.type.title.toUpperCase()}`;
    prev[prop] = (prev[prop] || 0) + +cur.price;
    return prev;
  }, {});
};

export default {
  _labels: [],
  _data: [],
  _moneyCtx: null,
  init(points) {
    const BAR_HEIGHT = 55;
    const moneyCtx = document.querySelector(`.statistic__money`);
    const moneyData = getMoneyData(points);

    this._moneyCtx = moneyCtx;
    this._labels = [...new Set(Object.keys(moneyData))];
    this._data = Object.values(moneyData);

    moneyCtx.height = BAR_HEIGHT * this._labels.length;

    this.render();
  },
  render() {
    return new Chart(this._moneyCtx, {
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
            formatter: (val) => `€ ${val}`
          }
        },
        title: {
          display: true,
          text: `MONEY`,
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
