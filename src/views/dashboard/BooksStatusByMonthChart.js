import React, { useEffect, useState } from 'react';
// import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import config from '../../config';
import { getJWTFromLS } from '../../utils/jwtUtils';

const BooksStatusByMonthChart = () => {
  // const theme = useTheme();
  // const { primary, secondary } = theme.palette.text;
  // const line = theme.palette.divider;

  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);

  const options = {
    chart: {
      type: 'bar',
      height: 430,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        borderRadius: 4
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 8,
      colors: ['transparent']
    },
    xaxis: {
      categories: categories
    },
    yaxis: {
      title: {
        text: 'Number of books'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter(val) {
          return `${val} books`;
        }
      }
    },
    legend: {
      show: true,
      fontFamily: `'Public Sans', sans-serif`,
      offsetX: 10,
      offsetY: 10,
      labels: {
        useSeriesColors: false
      },
      markers: {
        width: 16,
        height: 16,
        radius: '50%',
        offsexX: 2,
        offsexY: 2
      },
      itemMargin: {
        horizontal: 15,
        vertical: 50
      }
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          yaxis: {
            show: false
          }
        }
      }
    ]
  };

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(config.booksStatusByMonth, {
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
          console.log('Retrieved statusByMonth data successfully');
          console.log(data);

          // Extract data from API response and set to state
          const depositedCount = data.map((entry) => entry.depositedCount);
          const completedCount = data.map((entry) => entry.completedCount);
          const rejectedCount = data.map((entry) => entry.rejectedCount);
          setSeries([
            { name: 'Deposited', data: depositedCount },
            { name: 'Completed', data: completedCount },
            { name: 'Rejected', data: rejectedCount }
          ]);

          // Extract month labels
          const monthLabels = data.map((entry) => entry.yearMonth);
          setCategories(monthLabels);
        } else {
          const errorData = await response.text();
          throw new Error(`Invalid JSON response: ${errorData}`);
        }
      } catch (error) {
        console.error('Error fetching statusByMonth data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={430} />
    </div>
  );
};

export default BooksStatusByMonthChart;
