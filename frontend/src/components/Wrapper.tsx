import { Box } from "@chakra-ui/react";
import React from "react";

interface WrapperProps {
  variantSize?: "small" | "regular";
}

const Wrapper: React.FC<WrapperProps> = ({
  children,
  variantSize = "regular",
}) => {
  return (
    <Box
      maxWidth={variantSize === "regular" ? "800px" : "400px"}
      w="100%"
      mx="auto"
      mt={8}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
