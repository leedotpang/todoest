import { NextPage } from "next";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

const Logout: NextPage = () => {
  useEffect(() => {
    signOut({
      callbackUrl: "/login",
    });
  }, []);

  return <></>;
};

export default Logout;
