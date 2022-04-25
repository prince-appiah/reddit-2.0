import { Input, Button, Flex, Text } from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/modalAtoms";

type Props = {};

const Signup = (props: Props) => {
  const [loginForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const setAuthModalState = useSetRecoilState(authModalState);

  const handleOnChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setSignupForm((prev) => ({ ...prev, [ev.target.name]: ev.target.value }));
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
      <Input
        required
        name="confirmPassword"
        placeholder="Confirm Password"
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
        Sign Up
      </Button>
      <Flex fontSize={14} justify="center">
        <Text mr={2}>Already a redditor?</Text>
        <Text
          onClick={() =>
            setAuthModalState((prev) => ({ ...prev, view: "login" }))
          }
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
        >
          LOG IN
        </Text>
      </Flex>
    </form>
  );
};

export default Signup;
