import React from 'react';

const Chart = ({ data, type, filter }) => {
  const maxValue = Math.max(...data.map(item => item.sales || item.revenue || 0));
  const chartHeight = 200;
  const chartWidth = 400;

  const getDataKey = () => {
    switch (filter) {
      case 'daily':
        return 'date';
      case 'weekly':
        return 'week';
      case 'monthly':
        return 'month';
      case 'yearly':
        return 'year';
      default:
        return 'date';
    }
  };

  const getValueKey = () => {
    return 'sales'; // or 'revenue' based on chart type
  };

  const renderBars = () => {
    return data.map((item, index) => {
      const value = item[getValueKey()] || 0;
      const height = (value / maxValue) * chartHeight;
      const x = (index * chartWidth) / data.length;
      const width = chartWidth / data.length - 4;

      return (
        <rect
          key={index}
          x={x}
          y={chartHeight - height}
          width={width}
          height={height}
          fill="#667eea"
          rx="2"
        />
      );
    });
  };

  const renderLine = () => {
    const points = data.map((item, index) => {
      const value = item[getValueKey()] || 0;
      const x = (index * chartWidth) / data.length + (chartWidth / data.length) / 2;
      const y = chartHeight - (value / maxValue) * chartHeight;
      return `${x},${y}`;
    }).join(' ');

    return (
      <polyline
        points={points}
        fill="none"
        stroke="#667eea"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
      <svg
        width={chartWidth}
        height={chartHeight}
        className="w-full h-48 mb-4"
      >
        {type === 'bar' ? renderBars() : renderLine()}
      </svg>

      <div className="flex justify-between px-2">
        <div className="flex justify-between w-full">
          {data.map((item, index) => (
            <span key={index} className="text-xs text-gray-500 text-center -rotate-45 origin-center whitespace-nowrap">
              {item[getDataKey()].split(' ')[0]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chart;
