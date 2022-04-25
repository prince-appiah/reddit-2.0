import { FC } from "react";
import Navbar from "../Navbar";

type LayoutProps = {};

const Layout = ({ children }) => {
  return (
    <>
      {/* navbar */}
      <Navbar />
      <main>{children}</main>
      {/* footer */}
    </>
  );
};

export default Layout;
