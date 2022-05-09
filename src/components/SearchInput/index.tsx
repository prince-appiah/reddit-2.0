import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { User } from "firebase/auth";

type SearchInputProps = {
  user?: User | null;
};

const SearchInput = (props: SearchInputProps) => {
  const { user } = props;

  return (
    <Flex flexGrow={1} mr={2} align="center" maxWidth={user ? "auto" : 600}>
      <InputGroup alignItems="center">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" mb={1} />
        </InputLeftElement>
        <Input
          fontSize={14}
          placeholder="Search Reddit"
          cursor="pointer"
          height={34}
          bg="gray.50"
          _placeholder={{ color: "gray.500" }}
          _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
