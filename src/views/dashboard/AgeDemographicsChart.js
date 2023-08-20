import React, { useEffect, useState } from 'react';
// import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import config from '../../config';
import { getJWTFromLS } from '../../utils/jwtUtils';

const AgeDemographicsChart = () => {
  // const theme = useTheme();
  // const { info } = theme.palette;

  const [series, setSeries] = useState([]);
  const ageGroups = ['< 18', '19-25', '26-35', '36-45', '46-55', '56-65', '> 66'];

  const options = {
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
    labels: ageGroups
  };

  useEffect(() => {
    // Fetch data from the API
    const fetchAgeGroupData = async () => {
      try {
        const response = await fetch(config.ageGroup, {
          headers: {
            Authorization: 'Bearer ' + getJWTFromLS(), // Replace with your authentication logic
            'Content-Type': 'application/json'
          },
          method: 'GET'
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log('Retrieved ageGroup data successfully');
          console.log(data);
          // Assuming the data is an array of numbers representing age group counts
          setSeries(data);
        } else {
          const errorData = await response.text();
          throw new Error(`Invalid JSON response: ${errorData}`);
        }
      } catch (error) {
        console.error('Error fetching age group data:', error);
      }
    };

    fetchAgeGroupData();
  }, []);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="pie" height={415} />
    </div>
  );
};

export default AgeDemographicsChart;
