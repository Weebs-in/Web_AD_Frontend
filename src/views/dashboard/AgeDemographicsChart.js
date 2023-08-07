import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

const AgeDemographicsChart = () => {
  const theme = useTheme();
  // eslint-disable-next-line no-unused-vars
  const { info } = theme.palette;

  // eslint-disable-next-line no-unused-vars
  const [series, setSeries] = useState([20000, 22000, 18000, 25000, 21000, 19000, 13250]);
  // eslint-disable-next-line no-unused-vars
  const ageGroups = ['< 18', '19-25', '26-35', '36-45', '46-55', '56-65', '> 66'];

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
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#808000', '#00ffff', '#ff00ff'],
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

export default AgeDemographicsChart;
