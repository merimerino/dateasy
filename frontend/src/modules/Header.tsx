import { Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <Box p={4} borderBottom="1px" border={"none"}>
      <Link to={"/main"}>
        <Image src="/logo.png" alt="Logo" height="42px" objectFit="contain" />
      </Link>
    </Box>
  );
};

export default Header;
