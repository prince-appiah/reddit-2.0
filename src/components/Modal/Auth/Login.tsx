import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import error from "next/error";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/modalAtoms";
import { auth } from "../../../lib/firebase";
import { FIREBASE_ERRORS } from "../../../lib/firebase/errors";

type Props = {};

const Login = (props: Props) => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signinWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleOnChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({ ...prev, [ev.target.name]: ev.target.value }));
  };

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    signinWithEmailAndPassword(loginForm.email, loginForm.password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        required
        name="email"
        placeholder="Email Address"
        type="email"
        mb={2}
        onChange={handleOnChange}
        fontSize={14}
        _placeholder={{ color: "gray.500" }}
        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      <Input
        required
        name="password"
        placeholder="Enter Your Password"
        type="password"
        mb={2}
        onChange={handleOnChange}
        fontSize={14}
        _placeholder={{ color: "gray.500" }}
        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />

      {error && (
        <Text color="red" fontSize={12} my={3} textAlign="center">
          {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
        </Text>
      )}

      <Button type="submit" width="100%" isLoading={loading} height={9} mb={2}>
        Log In
      </Button>

      <Flex fontSize={14} justify="center" mb={3}>
        <Text mr={2}>Forgot Your Password?</Text>
        <Text
          onClick={() =>
            setAuthModalState((prev) => ({ ...prev, view: "resetPassword" }))
          }
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
        >
          RESET
        </Text>
      </Flex>

      <Flex fontSize={14} justify="center">
        <Text mr={2}>New to Reddit?</Text>
        <Text
          onClick={() =>
            setAuthModalState((prev) => ({ ...prev, view: "signup" }))
          }
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
        >
          SIGN UP
        </Text>
      </Flex>
    </form>
  );
};

export default Login;
