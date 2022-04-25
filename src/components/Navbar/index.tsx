import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import SearchInput from "../SearchInput";
import RightSide from "./RightSide";

const Navbar = () => {
  return (
    <Flex bgColor="white" height="44px" padding="6px 12px">
      <Flex align="center">
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
          display={{ base: "none", md: "unset" }}
        />
      </Flex>

      {/* <Directory/> */}
      <SearchInput />
      <RightSide />
    </Flex>
  );
};

export default Navbar;
