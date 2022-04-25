import { Flex } from "@chakra-ui/react";
import AuthModal from "../Modal/Auth";
import AuthBtns from "./AuthBtns";

type RightSideProps = {
  // user
};

const RightSide = (props: RightSideProps) => {
  const {} = props;

  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        <AuthBtns />
      </Flex>
    </>
  );
};

export default RightSide;
