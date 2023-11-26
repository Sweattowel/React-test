import { Heading, Button, VStack, Flex } from '@chakra-ui/react';
import { useMyContext } from './Context';

function SideBar() {
  const { myFormat, setMyFormat, currentPage, setCurrentPage, pageCount, setPageCount, page, setPage } = useMyContext();


  function contentCount(e) {
    e.preventDefault();

    switch (pageCount) {
      case 10:
        setPageCount(20);
        break;
      case 20:
        setPageCount(30);
        break;
      case 30:
        setPageCount(10);
        break;
      default:
        setPageCount(10);
        break;
    }
  }

  function paginateHandle(e, increment) {
    e.preventDefault();

    switch (increment) {
      case 5:
        setCurrentPage(currentPage + 5);
        break;
      case 1:
        setCurrentPage(currentPage + 1);
        break;
      case -1:
        setCurrentPage(currentPage - 1);
        break;
      case -5:
        setCurrentPage(currentPage - 5);
        break;
      default:
        setCurrentPage(currentPage);
        break;
    }
  }

  return (
    <VStack
      align="start"
      spacing={4}
      bg="gray.200"
      p={4}
      position="fixed"
      left={0}
      top="15vh"
      bottom={0}
      width="180px"
      height="300px"
    >
      <Heading w="100%" as="h1" size="xl" mb={4}>
        Format
      </Heading>
      {page === 'Page' && (
        <>
         <Button w="100%" colorScheme="teal" onClick={() => setMyFormat('line')}>
            Line
          </Button>
          <Button w="100%" colorScheme="teal" onClick={() => setMyFormat('grid')}>
            Grid
          </Button>
          <Button w="100%" colorScheme="teal" onClick={(e) => contentCount(e)}>
            {pageCount} Results
          </Button>        
        </>
      )}
      

      <Flex direction="column" alignItems="center" w="100%">
        <p>{`${page} ${currentPage}`}</p>
      </Flex>
      <Flex alignItems="center" w="100%">
        <Button w="8px" h="100%" onClick={(e) => paginateHandle(e, -5)}>
          -5
        </Button>
        <Button w="8px" h="100%" onClick={(e) => paginateHandle(e, -1)}>
          -1
        </Button>
        <Button w="8px" h="100%" onClick={(e) => paginateHandle(e, 1)}>
          +1
        </Button>
        <Button w="8px" h="100%" onClick={(e) => paginateHandle(e, 5)}>
          +5
        </Button>
      </Flex>
    </VStack>
  );
}

export default SideBar;