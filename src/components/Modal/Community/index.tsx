import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Text,
  Input,
  Stack,
  Checkbox,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { BsFillEyeFill, BsFillPersonFill, BsPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import React, { useState } from "react";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const AddCommunityModal = (props: Props) => {
  const { open, handleClose } = props;
  const [communityName, setCommunityName] = useState("");
  const [communityType, setCommunityType] = useState("public");
  const [characters, setCharacters] = useState(21);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 21) return;
    setCommunityName(e.target.value);
    setCharacters(21 - e.target.value.length);
  };

  const handleCheckboxChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityType(ev.target.value);
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            p={3}
          >
            Create A Community
          </ModalHeader>
          <Box px={3}>
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" py={4} px={0}>
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text color="gray.500" fontSize={11}>
                Community names including capitalization cannot be changed
              </Text>
              <Text
                position="relative"
                top={7}
                left={3}
                width={20}
                color="gray.500"
              >
                r/
              </Text>
              <Input
                name="communityName"
                value={communityName}
                position="relative"
                onChange={handleInputChange}
                size="sm"
                pl={6}
              />
              <Text fontSize={13} color={characters === 0 ? "red" : "gray.500"}>
                {characters} characters remaining
              </Text>

              <Box my={2}>
                <Text fontWeight={600} fontSize={15}>
                  Community Type
                </Text>
                {/*  */}
                <Stack spacing={2}>
                  <Checkbox
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={handleCheckboxChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillPersonFill} color="gray.500" mr={2} />
                      <Text fontSize={14} mr={1}>
                        Public
                      </Text>
                      <Text fontSize={12} color="gray.500">
                        Anyone can view posts and comment to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={handleCheckboxChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                      <Text fontSize={14} mr={1}>
                        Restricted
                      </Text>
                      <Text fontSize={12} color="gray.500">
                        Anyone can view this community but only approved users
                        can post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={handleCheckboxChange}
                  >
                    <Flex align="center">
                      <Icon as={HiLockClosed} color="gray.500" mr={2} />
                      <Text fontSize={14} mr={1}>
                        Private
                      </Text>
                      <Text fontSize={12} color="gray.500">
                        Only approved users can view posts and comment to this
                        community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button variant="outline" height={30} mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button height={30} onClick={() => null}>
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCommunityModal;
