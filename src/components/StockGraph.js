import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { SELECT_STOCK } from '../actions';
import isEmpty from 'lodash/isEmpty';
import head from 'lodash/head';
import ReactApexChart from 'react-apexcharts';
import ApexChart from 'apexcharts';
import { options } from '../utils/helper';
import moment from 'moment';
import './StockGraph.css';

const getButtons = (data, handleSelectedTab) => {
  return data.map(item => (
    <Button
      className='button'
      value={item.stockName}
      key={item.stockName}
      type={item.isSelected ? 'primary' : 'default'}
      size='large'
      onClick={handleSelectedTab}>
      {item.stockName}
    </Button>
  ));
};

const dynamicGraphOptions = {
  xaxis: {
    type: 'datetime',
    labels: {
      formatter: function(value, timestamp) {
        return moment(value).format('HH:mm:ss');
      },
    },
    title: {
      text: 'Timestamp in (HH:mm:ss)',
    },
  },
  yaxis: {
    title: {
      text: 'Price ($)',
    },
  },
  markers: {
    size: 6,
  },
  legend: {
    show: true,
  },
  noData: {
    text: 'Loading...',
    style: {
      fontSize: '24px',
    },
  },
  grid: {
    borderColor: '#e7e7e7',
    show: true,
    row: {
      colors: ['#f3f3f3', 'transparent'],
      opacity: 0.5,
    },
  },
};

const getSelection = data => data.filter(({ isSelected }) => !!isSelected);

const getSeriesData = data =>
  data.map(item => ({ name: item.stockName, data: item.stockTrend }));

class StockGraph extends React.Component {
  //select first tab to show graph
  componentDidMount() {
    const stocks = Object.values(this.props.stocks);
    if (!isEmpty(stocks)) {
      const { handleSelectedTab } = this.props;
      handleSelectedTab(head(stocks).stockName);
    }
  }

  componentDidUpdate() {
    const values = Object.values(this.props.stocks);
    const selectedTabs = getSelection(values);
    if (!isEmpty(selectedTabs)) {
      const seriesData = getSeriesData(selectedTabs);

      ApexChart.exec('realtime', 'updateSeries', seriesData);
    }
  }

  render() {
    const { stocks, handleSelectedTab } = this.props;
    const modifiedData = Object.values(stocks);
    const radioButtons = getButtons(modifiedData, handleSelectedTab);
    const selectedTabs = getSelection(modifiedData);
    const seriesData = !isEmpty(selectedTabs)
      ? getSeriesData(selectedTabs)
      : [];

    return (
      <div className='graphContainer' style={{ width: '68%' }}>
        {radioButtons}
        <ReactApexChart
          type='line'
          options={{
            ...options,
            ...dynamicGraphOptions,
          }}
          series={seriesData}
        />
      </div>
    );
  }
}

export default connect(
  ({ stocks }) => ({ stocks }),
  dispatch => ({
    dispatch,
    handleSelectedTab(e) {
      const payload = typeof e === 'string' ? e : e.target.value;
      dispatch({ type: SELECT_STOCK, payload });
    },
  }),
)(StockGraph);
