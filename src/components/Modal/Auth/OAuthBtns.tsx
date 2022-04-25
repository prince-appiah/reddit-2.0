import { Button, Flex } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

type Props = {};

const OAuthBtns = (props: Props) => {
  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button variant="oauth" mb={2}>
        <Image
          src="/images/googlelogo.png"
          alt="google-signin"
          width={20}
          height={20}
          //   mr={4}
        />
        Continue with Google
      </Button>
      <Button variant="oauth">Continue with Github</Button>
    </Flex>
  );
};

export default OAuthBtns;
