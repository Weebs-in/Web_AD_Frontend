import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

const TransactionAreaChart = () => {
  const theme = useTheme();
  // eslint-disable-next-line no-unused-vars
  const { info } = theme.palette;

  // eslint-disable-next-line no-unused-vars
  const [series, setSeries] = useState([290, 385, 298, 375, 400]);
  // eslint-disable-next-line no-unused-vars
  const ageGroups = ['North', 'East', 'South', 'West', 'Central'];

  // eslint-disable-next-line no-unused-vars
  const [options, setOptions] = useState({
    chart: {
      type: 'pie',
      height: 415,
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#fff']
      }
    },
    legend: {
      show: true,
      position: 'bottom'
    },
    plotOptions: {
      pie: {
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#808000'],
        offsetY: 25
      }
    },
    labels: ageGroups // Set the ageGroups array as the labels for the pie chart
  });

  useEffect(() => {
    // You can set the series data dynamically here if needed
    // For now, it will use the initial data specified in the state
  }, []);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="pie" height={415} />
    </div>
  );
};

export default TransactionAreaChart;
