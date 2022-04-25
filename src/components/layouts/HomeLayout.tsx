import { Flex } from "@chakra-ui/react";
import React from "react";

type Props = {
  children: React.ReactNode[];
};

const HomeLayout = (props: Props) => {
  const { children } = props;

  return (
    <Flex justify="center" py={4} px={0} border="1px solid red">
      <Flex
        width="95%"
        justify="center"
        maxWidth={860}
        border="1px solid green"
      >
        {/* Left content */}
        <Flex
          direction="column"
          width={{ base: "100%", md: "65%" }}
          mr={{ base: 0, md: 6 }}
          border="1px solid orange"
        >
          {children && children[0]}
        </Flex>

        {/* Right content */}
        <Flex
          direction="column"
          display={{ base: "none", md: "flex" }}
          flexGrow={1}
          border="1px solid purple"
        >
          {children && children[1]}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HomeLayout;
