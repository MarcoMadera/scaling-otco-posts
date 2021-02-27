import { Box, Button, Flex, Link as A } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import useUser from "../hooks/useUser";

export default function Navbar() {
  const {
    user,
    logout,
    loading,
    setUser,
    setIsLogin,
    logoutInProgress,
  } = useUser();
  return (
    <Flex bg="linen" p={4}>
      <Box ml="auto">
        {!user && !loading ? (
          <>
            <Link href="/login">
              <A href="/login" mr={2}>
                Login
              </A>
            </Link>
            <Link href="/register">
              <A href="/register">Register</A>
            </Link>
          </>
        ) : (
          <Flex>
            <Box mr={4}>{user?.username}</Box>
            <Button
              variant="link"
              isLoading={logoutInProgress}
              onClick={() => {
                logout().then(() => {
                  setUser(null);
                  setIsLogin(false);
                });
              }}
            >
              Logout
            </Button>
          </Flex>
        )}
      </Box>
    </Flex>
  );
}
