import { Button, Flex, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../lib/firebase";

type Props = {};

const OAuthBtns = (props: Props) => {
  const [signInWithGoogle, userCredentials, loading, error] =
    useSignInWithGoogle(auth);

  const createUserDoc = async (user: User) => {
    const userDocRef = doc(firestore, "users", user?.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (userCredentials) {
      createUserDoc(userCredentials.user);
    }
  }, [userCredentials]);

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
