import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface ModalComponentProps {
  data: Array<{ name: string; price: string; quantity: string }>;
  setData: React.Dispatch<React.SetStateAction<Array<{ name: string; price: string; quantity: string }>>>;
  dataEdit: { name?: string; price?: string; quantity?: string; index?: number };
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalComponent({
  data,
  setData,
  dataEdit,
  isOpen,
  onClose,
}: ModalComponentProps) {
  const [name, setName] = useState(dataEdit.name || '');
  const [price, setPrice] = useState(dataEdit.price || '');
  const [quantity, setQuantity] = useState(dataEdit.quantity || '');

  useEffect(() => {
    setName(dataEdit.name || '');
    setPrice(dataEdit.price || '');
    setQuantity(dataEdit.quantity || '');
  }, [dataEdit]);

  const handleSave = () => {
    if (!name || !price || !quantity) return;

    const newData = {
      name,
      price,
      quantity,
    };

    const newDataArray = Object.keys(dataEdit).length
      ? data.map((item, index) => (index === dataEdit.index ? newData : item))
      : [...data, newData];

    localStorage.setItem("cad_produto", JSON.stringify(newDataArray));

    setData(newDataArray);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastrar Produto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl display="flex" flexDir="column" gap={4}>
            <Box>
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>Preço</FormLabel>
              <Input
                type="number"
                value={price}
                placeholder="R$"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>Quantidade</FormLabel>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Box>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button bg="teal.700" color="white" _hover={{ bg: "teal.600" }}  mr={3} onClick={handleSave}>
            Salvar
          </Button>
          <Button colorScheme="gray" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
