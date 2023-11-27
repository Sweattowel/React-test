import { Box, Flex, Heading, OrderedList, ListItem, Text } from '@chakra-ui/react';
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
  const [leastRisk, setLeastRisk] = useState([])
  const [mostRisk, setMostRisk] = useState([])
  const { setCurrentPage, currentPage, setPage } = useMyContext();
  const [countryCount, setCountryCount] = useState({})
// init setup of users and creation of most and least at risk users as well as country assingment
  useEffect(() => {
    if (!users.length) {
      setUsers(userData);
    }
    
    const storage = users
    const newData = {}
    for (const user of users){
      let country = user.countryCode
      if (!newData[country]){
        newData[country] = 1
      } else {
        newData[country]++
      }
    }
    setCountryCount(newData)
    storage.sort((a, b) => {
      if (a.totalLogins < b.totalLogins){
        return -1
      }
      if (a.totalLogins > b.totalLogins){
        return 1
      }
      return 0
    })
    const top5users = storage.slice(storage.length - 5, storage.length).reverse()
    const low5users = storage.slice(0, 5)
    setLeastRisk(top5users)
    setMostRisk(low5users)
  }, [users]);

// create and set max and min year as well as year variables
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

  // configure sidebar to match the set page
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
      <Flex marginLeft='300px' flexDirection='row' >
      <Box marginLeft={8}>
        <Heading marginBottom={5}>
          At risk
        </Heading>
        <OrderedList pl={4}>
            {mostRisk.map((user, index) => (
              <ListItem marginBottom={1} fontSize='xl' key={user.id}>{user.username}: {user.totalLogins}</ListItem>
            ))}
          </OrderedList>
        </Box>
        <Box marginLeft={100} >
          <Heading marginBottom={5}>
            Least risk
          </Heading>
          <OrderedList pl={4}  >
            {leastRisk.map((user, index) => (
              <ListItem marginBottom={1} fontSize='xl' key={user.id}>{user.username}: {user.totalLogins}</ListItem>
            ))}
          </OrderedList>
      </Box>
      <Box marginLeft={100}>
        <Heading>
          Total Users: {users.length}
        </Heading>
              <Heading fontSize='x-large' marginBottom={'10px'}>
                By country
              </Heading>
        <OrderedList>
          {Object.entries(countryCount).map(([country, count]) => (
            <ListItem key={country}>{country}: {count}</ListItem>
          ))}
        </OrderedList>
      </Box>
      </Flex>
    </>
  );
}