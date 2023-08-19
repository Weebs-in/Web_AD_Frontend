import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import config from '../../config';
import { getJWTFromLS } from '../../utils/jwtUtils';

const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};

const BooksTransactionChart = () => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);
  const [series, setSeries] = useState([
    {
      name: 'Number of successful transaction',
      data: []
    }
  ]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main],
      xaxis: {
        categories: [], // We will populate this dynamically based on the API data
        labels: {
          style: {
            colors: [secondary]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: 6 // Default value (will be updated dynamically)
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'light'
      }
    }));
  }, [primary, secondary, line, theme]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(config.booksStatusByMonth, {
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

          // Extract month labels and completed counts from the data
          const monthLabels = data.map((item) => item.yearMonth);
          const completedCounts = data.map((item) => item.completedCount);

          setSeries([
            {
              name: 'Number of successful transaction',
              data: completedCounts
            }
          ]);

          setOptions((prevState) => ({
            ...prevState,
            xaxis: {
              ...prevState.xaxis,
              categories: monthLabels
            },
            tickAmount: monthLabels.length // Update tickAmount based on the number of months
          }));
        } else {
          const errorData = await response.text();
          throw new Error(`Invalid JSON response: ${errorData}`);
        }
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };

    fetchData();
  }, []);

  return <ReactApexChart options={options} series={series} type="area" height={450} />;
};

export default BooksTransactionChart;
