import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import SearchInput from "../SearchInput";
import CommunityDropdown from "./CommunityDropdown";
import RightSide from "./RightSide";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <Flex
      bgColor="white"
      height="44px"
      padding="6px 12px"
      justify={{ md: "space-between" }}
    >
      <Flex align="center" width={{ base: 40, md: "auto" }}>
        <Image
          src="/images/redditFace.svg"
          height={30}
          width={30}
          layout="intrinsic"
          alt=""
        />
        <Image
          src="/images/redditText.svg"
          height={46}
          width={50}
          layout="intrinsic"
          alt=""
          // display={{ base: "none", md: "unset" }}
        />
      </Flex>

      {user && <CommunityDropdown />}
      <SearchInput user={user} />
      <RightSide user={user} />
    </Flex>
  );
};

export default Navbar;
