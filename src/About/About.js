import { Box, Button, Heading, Text } from '@chakra-ui/react';
import userData from '../Home/data.json';
import { useEffect, useState } from 'react';
import { useMyContext } from '../Context';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function About() {
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      ];
  const [signUpData, setSignUpData] = useState([]);
  const [users, setUsers] = useState([]);
  const [minYear, setMinYear] = useState(Infinity);
  const [maxYear, setMaxYear] = useState(-Infinity);
  const { setCurrentPage, currentPage, setPage } = useMyContext();

  useEffect(() => {
    if (!users.length) {
      setUsers(userData);
    }
  }, [users]);

  useEffect(() => {
    const newData = {};

    for (const user of users) {
      let dateString = user.signupTime;
      let dateObj = new Date(dateString);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;

      if (year < minYear) {
        setMinYear(year);
      }
      if (year > maxYear) {
        setMaxYear(year);
      }

      if (!newData[year]) {
        newData[year] = {};
      }

      if (!newData[year][month]) {
        newData[year][month] = 1;
      } else {
        newData[year][month]++;
      }
    }

    setPage('Year');
    setSignUpData(newData);
    setCurrentPage(minYear !== Infinity ? minYear : 2020);
  }, [users, minYear, maxYear, setPage, setCurrentPage]);

  useEffect(() => {
    setPage('Year');
    if (currentPage < minYear) {
      setCurrentPage(minYear);
    }
    if (currentPage > maxYear) {
      setCurrentPage(maxYear);
    }
  }, [signUpData, currentPage, setCurrentPage, minYear, maxYear, setPage]);

  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  const chartData = months.map((month) => ({
    month: monthNames[month - 1], // Adjust monthNames array to start from 0 index
    Months: signUpData[currentPage] ? signUpData[currentPage][month] || 0 : 0,
  }));

  const maxY = Math.max(...chartData.map((entry) => entry.count)) + 1;
  return (
    <>
    <Heading color='teal' marginLeft='250px' marginTop='100px'>
        Signups per year
    </Heading>
      <ResponsiveContainer width="100%" height={600}>
        <BarChart data={chartData} margin={{ top: 100, right: 30, left: 200, bottom: 5 }}>
          <XAxis dataKey="month" tickFormatter={(value) => monthNames.indexOf(value) + 1} />
          <YAxis domain={[0, maxY]} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="Months"
            stackId="a"
            fill={`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
              Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)}, 0.5)`}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}