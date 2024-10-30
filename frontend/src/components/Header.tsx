// components/Header.tsx
import React from "react";
import { Box, Image } from "@chakra-ui/react";

const Header: React.FC = () => {
  return (
    <Box p={4} borderBottom="1px" border={"none"}>
      <Image src="/logo.png" alt="Logo" height="42px" objectFit="contain" />
    </Box>
  );
};

export default Header;
