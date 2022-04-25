import { Button } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/modalAtoms";

type Props = {};

const AuthBtns = (props: Props) => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <>
      <Button
        onClick={() =>
          setAuthModalState((prev) => ({ ...prev, open: true, view: "login" }))
        }
        variant="outline"
        height={8}
        width={{ base: 70, md: 110 }}
        mr={2}
        display={{ base: "none", sm: "flex" }}
      >
        Log In
      </Button>
      <Button
        onClick={() =>
          setAuthModalState((prev) => ({ ...prev, open: true, view: "signup" }))
        }
        height={8}
        width={{ base: 70, md: 110 }}
        mr={2}
        display={{ base: "none", sm: "flex" }}
      >
        Sign Up
      </Button>
    </>
  );
};

export default AuthBtns;
