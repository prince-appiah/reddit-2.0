import { Input, Button, Flex, Text } from "@chakra-ui/react";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { authModalState } from "../../../atoms/modalAtoms";
import { auth, firestore } from "../../../lib/firebase";
import { FIREBASE_ERRORS } from "../../../lib/firebase/errors";
import { User } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

type Props = {};

const Signup = (props: Props) => {
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const setAuthModalState = useSetRecoilState(authModalState);
  const [createUserWithEmailAndPassword, userCredentials, loading, authError] =
    useCreateUserWithEmailAndPassword(auth);

  const handleOnChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setSignupForm((prev) => ({ ...prev, [ev.target.name]: ev.target.value }));
  };

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (error) setError("");

    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(signupForm.email, signupForm.password);
  };

  const createUserDoc = async (user: User) => {
    await addDoc(
      collection(firestore, "users"),
      JSON.parse(JSON.stringify(user))
    );
  };

  useEffect(() => {
    if (userCredentials) {
      createUserDoc(userCredentials.user);
      // setAuthModalState(false);
    }
  }, [userCredentials]);

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

      {(error || authError) && (
        <Text textAlign="center" color="red" mb={2} fontSize={12}>
          {error ||
            FIREBASE_ERRORS[authError?.message as keyof typeof FIREBASE_ERRORS]}
        </Text>
      )}

      <Button type="submit" width="100%" isLoading={loading} height={9} mb={2}>
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
