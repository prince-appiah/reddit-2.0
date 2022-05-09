import { Button, Flex } from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import { auth } from "../../lib/firebase";
import AuthModal from "../Modal/Auth";
import AuthBtns from "./AuthBtns";
import DropdownMenu from "./DropdownMenu";
import Icons from "./Icons";

type RightSideProps = {
  user?: User | null;
};

const RightSide = (props: RightSideProps) => {
  const { user } = props;

  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? <Icons /> : <AuthBtns />}

        {/* Dropdown menu goes here  */}
        <DropdownMenu user={user} />
      </Flex>
    </>
  );
};

export default RightSide;
