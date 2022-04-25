import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/modalAtoms";

type Props = {};

const Login = (props: Props) => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const setAuthModalState = useSetRecoilState(authModalState);

  const handleOnChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({ ...prev, [ev.target.name]: ev.target.value }));
  };

  const handleSubmit = () => {};

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

      <Button type="submit" width="100%" height={9} mb={2}>
        Log In
      </Button>
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
