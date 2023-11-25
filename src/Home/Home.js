import React, { useState, useEffect } from 'react';
import { useMyContext } from '../Context';
import userData from './data.json'; 
import MapComponent from './MapComponent';
import { Box, Flex, Button, Spacer, SimpleGrid, Text, UnorderedList, ListItem, Heading } from '@chakra-ui/react';
function Home() {
  const [users, setUsers] = useState(userData);
  const { myFormat, setMyFormat, currentPage, setCurrentPage,  selectedUser, setSelectedUser, pageCount, setPageCount } = useMyContext()
  const totalUsers = userData.length;
  const totalPages = Math.ceil(totalUsers / pageCount);

  function changeUser(user) {
    setSelectedUser(user)
  }
  useEffect(() => {
    // When currentPage or pageCount changes, update the displayed users
    setCurrentPage((prevPage) => Math.min(prevPage, totalPages));
    const startIndex = (currentPage - 1) * pageCount;
    const endIndex = startIndex + pageCount;
    setUsers(userData.slice(startIndex, endIndex));
  }, [currentPage, pageCount, totalPages, setCurrentPage]);

 
  return (
<Flex height="1000px" w='80%' ml='200px' mt='100px'>
      <Box flex="1" p="4" w='50%'>
  <Heading
  color='teal'
  marginBottom='10px'
  >
    Total users in database:{userData.length}
  </Heading>        
        {myFormat === 'line' ? (
          <Flex flexDirection="column">
            <UnorderedList listStyleType="none" padding={0}>
              {users.map((user) => (
                <ListItem key={user.id}>
                  <Button
                    colorScheme={selectedUser && selectedUser.id === user.id ? 'teal' : 'gray'}
                    h='70px'
                    w='100%'
                    onClick={() => changeUser(user)}
                    format={myFormat}
                    marginBottom='4'
                    border='1px solid black'
                  >
                    <Text marginRight='10px' fontSize='2xl'>{user.username}</Text>
                    <Text marginRight='10px' marginTop='0.3%' fontSize='xl'>ID: {user.id}</Text>
                    <Text marginRight='10px' marginTop='0.3%' fontSize='xl'>Logins: {user.totalLogins}</Text>
                    <Text fontSize='xl' marginTop='0.3%'>Country: {user.countryCode}</Text>
                  </Button>
                </ListItem>
              ))}
            </UnorderedList>
          </Flex>
        ) : (
          <SimpleGrid columns={3} spacing={4}>
            {users.map((user) => (
                 <Button
                 colorScheme={selectedUser.id === user.id ? 'teal' : 'gray'}
                 onClick={() => changeUser(user)}
                 format={myFormat}
                 marginBottom='4'
                 border='1px solid black'
               >
                 <Text marginRight='5px'> {user.username}</Text>
                 <Text marginRight='5px'>ID: {user.id}</Text>
               </Button>
            ))}
          </SimpleGrid>
        )}
      </Box>

      {selectedUser && (
        <Flex p="4" direction='column' w='60%' h='80vh'>
          <MapComponent user={selectedUser} h='1000px'/>
          <Flex direction='column' marginLeft='10px'>
            <Heading
            color='teal'
            >
            User: {selectedUser.username}
           </Heading>
           <Box color='teal'>
           <Text
              marginRight='10px'
              fontSize='2xl'
              color='teal'
            >
            ID: {selectedUser.id}
          </Text>
          <Text
              marginRight='10px'
              fontSize='2xl'
              color='teal'
            >
            CountryCode: {selectedUser.countryCode}
          </Text>
          <Text
              marginRight='10px'
              fontSize='2xl'
              color='teal'
            >
            TotalLogins: {selectedUser.totalLogins}
          </Text>
          <Text
              marginRight='10px'
              fontSize='2xl'
              color='teal'
            >
            PostCode:{selectedUser.address.postcode}
          </Text>
          <Text
              marginRight='10px'
              fontSize='2xl'
              color='teal'
            >
            State: {selectedUser.address.state}
          </Text>
          <Text
              marginRight='10px'
              fontSize='2xl'
              color='teal'
            >
            Street: {selectedUser.address.street}
          </Text>
          <Text
              marginRight='10px'
              fontSize='2xl'
              color='teal'
            >
            HouseNumber: {selectedUser.address.houseNumber}
          </Text>
          </Box>
          </Flex>

          
        </Flex>
      )}
    </Flex>
  );
}

export default Home;