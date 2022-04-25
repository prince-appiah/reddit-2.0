import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { GrAdd } from "react-icons/gr";
import { useSetRecoilState } from "recoil";
import { communityState } from "../../atoms/communityAtoms";
import { auth } from "../../lib/firebase";
import AddCommunityModal from "../Modal/Community";

type Props = {};

const Communities = (props: Props) => {
  const [open, setOpen] = useState(false);
  const setModalState = useSetRecoilState(communityState);
  const [user] = useAuthState(auth);

  return (
    <>
      <AddCommunityModal
        user_id={user?.uid!}
        open={open}
        handleClose={() => setOpen(false)}
      />
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
