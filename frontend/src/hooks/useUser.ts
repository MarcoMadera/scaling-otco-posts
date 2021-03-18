import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";
import isServer from "../utils/isServer";

export default function useUser() {
  const { user, setUser, setIsLogin, isLogin } = useContext(UserContext);
  const [{ data, fetching }] = useMeQuery({ pause: isServer() });
  const login = useLoginMutation()[1];
  const [{ fetching: logoutInProgress }, logout] = useLogoutMutation();

  useEffect(() => {
    if (data?.me) {
      setUser(data.me);
      setIsLogin(true);
    }
  }, [data]);

  return {
    user,
    login,
    setUser,
    isLogin,
    setIsLogin,
    logout,
    loading: fetching,
    logoutInProgress,
  };
}
