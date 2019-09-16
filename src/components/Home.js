import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import StockTable from './StockTable';
import StockGraph from './StockGraph';
import { Spin } from 'antd';
import './Home.css';

class Home extends PureComponent {
  render() {
    const { stocks, isLoading } = this.props;
    return isLoading ? (
      <Spin tip='Fetching data...' size='large' />
    ) : (
      <div className='container'>
        <StockGraph />
        <StockTable data={stocks} />
      </div>
    );
  }
}

export default connect(({ stocks, isLoading }) => ({
  stocks,
  isLoading,
}))(Home);
