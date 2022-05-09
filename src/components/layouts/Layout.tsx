import { FC, ReactNode } from "react";
import Navbar from "../Navbar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
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
