import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  Text,
  MenuList,
} from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaRedditSquare } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { MdOutlineLogin } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { communityState } from "../../atoms/communityAtoms";
import { authModalState } from "../../atoms/modalAtoms";
import { auth } from "../../lib/firebase";

type Props = {
  user?: User | null;
};

const DropdownMenu = (props: Props) => {
  const { user } = props;
  const setModalState = useSetRecoilState(authModalState);

  const handleLogout = async () => {
    await signOut(auth);
    //clear state
    // resetCommunityState();
  };

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        _hover={{
          outline: "1px solid",
          outlineColor: "gray.200",
        }}
      >
        <Flex align="center">
          <Flex align="center">
            {user ? (
              <>
                <Icon
                  fontSize={24}
                  as={FaRedditSquare}
                  mr={1}
                  color="gray.300"
                />
                <Box
                  display={{ base: "none", lg: "flex" }}
                  flexDirection="column"
                  fontSize="8pt"
                  alignItems="flex-start"
                  mr={8}
                >
                  <Text fontWeight={700}>
                    {user?.displayName || user?.email?.split("@")[0]}
                  </Text>
                  <Flex alignItems="center">
                    <Icon as={IoSparkles} color="brand.100" mr={1} />
                    <Text color="gray.400">blackwolf1</Text>
                  </Flex>
                </Box>
              </>
            ) : (
              <Icon
                fontSize={24}
                color="gray.400"
                mr={1}
                mt={2}
                as={VscAccount}
              />
            )}
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontSize={14}
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={CgProfile} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />

            <MenuItem
              fontSize={14}
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={handleLogout}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                Logout
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              fontSize={14}
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={() =>
                setModalState((props) => ({
                  ...props,
                  open: true,
                  view: "login",
                }))
              }
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                Login/Signup
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default DropdownMenu;
