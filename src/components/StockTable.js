import React, { PureComponent } from 'react';
import { Table, Icon } from 'antd';
import TimeAgo from 'react-timeago';
import './StockTable.css';

const columns = [
  {
    title: 'Name',
    dataIndex: 'stockName',
    key: 'stockName',
  },
  {
    title: 'Price',
    dataIndex: 'stockPrice',
    key: 'stockPrice',
    render: (stockPrice, { changePercent }) => {
      if (!changePercent || changePercent === 0) {
        return <span>{stockPrice}</span>;
      }
      return changePercent > 0 ? (
        <span style={{ color: 'green' }}>
          {stockPrice}
          <Icon type='caret-up' style={{ color: 'green' }} />
        </span>
      ) : (
        <span style={{ color: 'red' }}>
          {stockPrice}
          <Icon type='caret-down' style={{ color: 'red' }} />
        </span>
      );
    },
  },
  {
    title: '%Change',
    dataIndex: 'changePercent',
    key: 'changePercent',
    render: changePercent => {
      if (!changePercent || changePercent === 0) return;
      return changePercent > 0 ? (
        <span style={{ color: 'green' }}>{changePercent}</span>
      ) : (
        <span style={{ color: 'red' }}>{changePercent}</span>
      );
    },
  },
  {
    title: 'LastUpdated',
    dataIndex: 'stockTrend',
    key: 'lastUpdated',
    render: stockTrend => {
      const length = stockTrend.length;
      return <TimeAgo date={stockTrend[length - 1][0]} />;
    },
  },
];

const modifyData = data => {
  return Object.values(data);
};

class StockTable extends PureComponent {
  render() {
    const { data } = this.props;
    const dataSource = modifyData(data);

    return (
      <div className='tableContainer'>
        <Table
          columns={columns}
          dataSource={dataSource}
          bordered
          showHeader
          rowKey='stockName'
          pagination={{
            defaultPageSize: 7,
            pageSize: 7,
          }}
        />
      </div>
    );
  }
}

export default StockTable;
