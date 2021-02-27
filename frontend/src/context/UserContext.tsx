import { Props } from "framer-motion/types/types";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { MeQuery } from "../generated/graphql";

type UserType = {
  user: MeQuery["me"] | null;
  setUser: Dispatch<SetStateAction<MeQuery["me"] | null>>;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  isLogin: boolean;
};
export const UserContext = createContext<UserType>({
  user: null,
  setUser: () => {},
  setIsLogin: () => {},
  isLogin: false,
});

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<MeQuery["me"] | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  console.log({ user, isLogin });

  return (
    <UserContext.Provider value={{ user, setUser, setIsLogin, isLogin }}>
      {children}
    </UserContext.Provider>
  );
}
