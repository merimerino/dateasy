import {
  Box,
  Button,
  Image,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const isProf = location.pathname === "/prof";
  const buttonLink = isProf ? "/" : "/prof";
  const buttonText = isProf ? t("forStudents") : t("forProfessors");

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box p={4} borderBottom="1px" borderColor="gray.100">
      <HStack justify="space-between" align="center">
        <Link to="/">
          <Image src="/logo.png" alt="Logo" height="42px" objectFit="contain" />
        </Link>

        <HStack spacing={4}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Language"
              icon={<Globe size={18} />}
              variant="ghost"
              size="sm"
            >
              {i18n.language === "hr" ? "HR" : "EN"}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => changeLanguage("en")}>English</MenuItem>
              <MenuItem onClick={() => changeLanguage("hr")}>Hrvatski</MenuItem>
            </MenuList>
          </Menu>

          <Link to={buttonLink}>
            <Button colorScheme="teal" size="md">
              {buttonText}
            </Button>
          </Link>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Header;
