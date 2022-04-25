import { Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../lib/firebase";

type Props = {};

const OAuthBtns = (props: Props) => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button
        variant="oauth"
        mb={2}
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image
          src="/images/googlelogo.png"
          alt="google-signin"
          width={20}
          height={20}
        />
        Continue with Google
      </Button>
      <Button variant="oauth">Continue with Github</Button>

      {error && (
        <Text color="red" fontSize={12} my={3} textAlign="center">
          {error.message}
        </Text>
      )}
    </Flex>
  );
};

export default OAuthBtns;
