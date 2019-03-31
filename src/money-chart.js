import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default {
  _labels: [],
  _data: [],
  _moneyCtx: null,
  init(points) {
    const BAR_HEIGHT = 55;
    const moneyCtx = document.querySelector(`.statistic__money`);

    this._moneyCtx = moneyCtx;
    this._labels = points.map(({type}) => `${type.icon} ${type.title.toUpperCase()}`);
    this._data = points.map((item) => item.price);

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
