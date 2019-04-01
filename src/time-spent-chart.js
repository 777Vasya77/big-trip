import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from "moment";

const getTimeSpentData = (tripPoints) => {
  return tripPoints.reduce((prev, cur) => {
    const duration = moment.duration(moment(cur.timetable.to).diff(moment(cur.timetable.from)));

    const prop = `${cur.type.icon} ${cur.type.title.toUpperCase()}`;
    prev[prop] = (prev[prop] || 0) + Math.round(duration.asHours());
    return prev;
  }, {});
};

export default {
  _labels: [],
  _data: [],
  _timeSpendCtx: null,
  init(points) {
    const BAR_HEIGHT = 55;
    const timeSpendCtx = document.querySelector(`.statistic__time-spend`);
    const timeSpentData = getTimeSpentData(points);

    this._timeSpendCtx = timeSpendCtx;
    this._labels = [...new Set(Object.keys(timeSpentData))];
    this._data = Object.values(timeSpentData);

    timeSpendCtx.height = BAR_HEIGHT * this._labels.length;

    this.render();
  },
  render() {
    return new Chart(this._timeSpendCtx, {
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
            formatter: (val) => `${val}H`
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
