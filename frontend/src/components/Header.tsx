// components/Header.tsx
import React from "react";
import { Box, Image } from "@chakra-ui/react";

const Header: React.FC = () => {
  return (
    <Box p={4} borderBottom="1px" borderColor="gray.200">
      <Image src="/logo.png" alt="Logo" height="40px" objectFit="contain" />
    </Box>
  );
};

export default Header;
