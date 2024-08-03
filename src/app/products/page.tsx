'use client';
import ModalComponent from "@/components/Modal/Modal";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { 
  Box, 
  Button, 
  Flex,
  Table, 
  Tbody, 
  Td, 
  Th, 
  Thead, 
  Tr,
  useDisclosure,
  useBreakpointValue // Alterado aqui
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  // Substituído useBreakpoint por useBreakpointValue
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("cad_produto");
      const db_product = storedData ? JSON.parse(storedData) : [];
      setData(db_product);
    }
  }, []);
  

  const handleRemove = (index: number) => {
    const newArray = data.filter((_, i) => i !== index);
    setData(newArray);
    if (typeof window !== "undefined") {
      localStorage.setItem("cad_produto", JSON.stringify(newArray));
    }
  }

  return (
    <>
      <Flex 
        h="100vh" 
        align="center" 
        justify="center" 
        fontSize="20px" 
        fontFamily="poppins"
        direction="column"
        px={4}
      >
        <Box maxW={800} w="100%" h="100vh" py={10} px={2}>
          <Button colorScheme="purple"  onClick={() => [setDataEdit({}), onOpen()]}>
            Adicionar 
          </Button>
          <Box overflowY="auto" height="100%">
            <Table mt="6">
              <Thead>
                <Tr>
                  <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                    Nome
                  </Th>
                  <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                    Preço
                  </Th>
                  <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                    Quantidade
                  </Th>
                  <Th p={0}></Th>
                  <Th p={0}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item: any, index: number) => (
                  <Tr key={index} cursor="pointer" _hover={{ bg: "gray.100" }}>
                    <Td maxW={isMobile ? 5 : 100}>{item.name}</Td>
                    <Td maxW={isMobile ? 5 : 100}>{item.price}</Td>
                    <Td maxW={isMobile ? 5 : 100}>{item.quantity}</Td>
                    <Td p={0}>
                      <EditIcon
                        fontSize={20}
                        onClick={() => [
                          setDataEdit({ ...item, index }),
                          onOpen(),
                        ]}
                      />
                    </Td>
                    <Td p={0}>
                      <DeleteIcon
                        fontSize={20}
                        onClick={() => handleRemove(index)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
        {isOpen && (
          <ModalComponent
            data={data}
            setData={setData}
            dataEdit={dataEdit}
            isOpen={isOpen}
            onClose={onClose}
          />  
        )}
      </Flex>
    </>
  );
}
