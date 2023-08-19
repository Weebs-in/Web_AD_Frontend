import React, { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import config from '../../config';
import { getJWTFromLS } from '../../utils/jwtUtils';

const barChartOptions = {
  chart: {
    type: 'bar',
    height: 415,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      horizontal: true, // Set this to true for horizontal bars
      columnWidth: '45%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: true
  },
  xaxis: {
    axisBorder: {
      show: true
    },
    axisTicks: {
      show: true
    }
  },
  yaxis: {
    show: true
  },
  grid: {
    show: false
  }
};

// ==============================|| MONTHLY LIKED CHART ||============================== //

const MonthlyLikedChart = () => {
  // eslint-disable-next-line no-unused-vars
  // not using const book as I am directly retrieving data and only using it in one place
  // const [book, setBook] = useState([]);
  const theme = useTheme();
  const { secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(barChartOptions);

  useEffect(() => {
    // Fetch data from the API
    fetchBook()
      .then((data) => {
        // Process the fetched data and set it in the state
        console.log('data to be sorted: ', data);
        const sortedData = data.sort((a, b) => b.likeCount - a.likeCount); // Sort data by likes in descending order
        const top10Data = sortedData.slice(0, 10); // Take top 10 books

        const chartSeries = [
          {
            name: 'Number of likes accumulated',
            data: top10Data.map((item) => item.likeCount) // Extract number of likes for the top 10 books
          }
        ];

        setSeries(chartSeries);

        // Update the options with dynamic data
        setOptions((prevState) => ({
          ...prevState,
          xaxis: {
            categories: top10Data.map((item) => item.title), // Extract book names for the top 10 books
            labels: {
              style: {
                colors: new Array(top10Data.length).fill(secondary)
              }
            }
          },
          tooltip: {
            theme: 'light'
          }
        }));
      })
      .catch((error) => {
        console.error('Error fetching monthly liked data:', error);
      });
  }, [info, secondary]);

  // Replace this with your actual API fetching logic
  const fetchBook = async () => {
    try {
      const response = await fetch(config.book, {
        headers: {
          Authorization: 'Bearer ' + getJWTFromLS(),
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
        console.log('Retrieved book data successfully');
        console.log(data);
        // set "book" only if I use the book constant
        // setBook(data);
        return data; // Return the fetched data
      } else {
        const errorData = await response.text();
        throw new Error(`Invalid JSON response: ${errorData}`);
      }
    } catch (error) {
      console.error('Error fetching book data:', error);
    }
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={415} />
    </div>
  );
};

export default MonthlyLikedChart;
