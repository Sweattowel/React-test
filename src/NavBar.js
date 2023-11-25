import { Box, Flex, Link, Heading, Spacer } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function NavBar() {
  return (
    <Box bg="teal.500" p={4}>
      <Flex>
        <Heading textAlign='flex-start'>
          Data
        </Heading>
        <Spacer />
        <Flex direction="column">
          <Box>
            <Link to="/" color="white" as={RouterLink}>
              Home
            </Link>
          </Box>
          <Box>
            <Link to="/about" color="white" as={RouterLink}>
              About
            </Link>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default NavBar;