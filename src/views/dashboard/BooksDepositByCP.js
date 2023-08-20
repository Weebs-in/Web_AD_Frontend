import React, { useEffect, useState } from 'react';
// import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import config from '../../config';
import { getJWTFromLS } from '../../utils/jwtUtils';

const BooksDepositByCP = () => {
  // const theme = useTheme();
  // const { info } = theme.palette;

  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);

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
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#808000'],
        offsetY: 25
      }
    },
    labels: labels
  };

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(config.groupCount, {
          headers: {
            Authorization: 'Bearer ' + getJWTFromLS()
          },
          method: 'GET'
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log('Retrieved groupCount data successfully');
          console.log(data);

          // Map data to series and labels
          const newSeries = data.map((item) => item.count);
          const newLabels = data.map((item) => item.address); // Use 'address' as labels

          setSeries(newSeries);
          setLabels(newLabels);
        } else {
          const errorData = await response.text();
          throw new Error(`Invalid JSON response: ${errorData}`);
        }
      } catch (error) {
        console.error('Error fetching group count data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="pie" height={415} />
    </div>
  );
};

export default BooksDepositByCP;
