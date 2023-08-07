import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

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
    categories: [
      "Charlotte's Web",
      'Life of Pi',
      'Harry Potter and the Deathly Hallows',
      'The Secret Life of Bees',
      'The Godfather',
      'Eat, Pray, Love',
      'The Three Musketeers',
      'The Prophet',
      'Jurassic Park',
      "Cat's Cradle"
    ],
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
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  const [series] = useState([
    {
      name: 'Number of likes accumulated',
      data: [112, 108, 103, 96, 93, 91, 89, 88, 85, 83]
    }
  ]);

  const [options, setOptions] = useState(barChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [info],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      },
      tooltip: {
        theme: 'light'
      }
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primary, info, secondary]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={415} />
    </div>
  );
};

export default MonthlyLikedChart;
