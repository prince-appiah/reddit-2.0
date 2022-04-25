import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { useSetRecoilState } from "recoil";
import { communityState } from "../../atoms/communityAtoms";
import AddCommunityModal from "../Modal/Community";

type Props = {};

const Communities = (props: Props) => {
  const setModalState = useSetRecoilState(communityState);
  const [open, setOpen] = useState(false);

  return (
    <>
      <AddCommunityModal open={open} handleClose={() => setOpen(false)} />
      <MenuItem
        onClick={() => setOpen(true)}
        width="100%"
        fontSize={14}
        _hover={{ bg: "gray.100" }}
      >
        <Flex align="center">
          <Icon fontSize={20} mr={2} as={GrAdd} />
          Create Community
        </Flex>
      </MenuItem>
    </>
  );
};

export default Communities;
