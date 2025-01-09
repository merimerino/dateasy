import { Box, Button, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBigLeft } from "lucide-react";

interface ProfessorDescriptionProps {
  description: string;
}

const ProfessorDescription: React.FC<ProfessorDescriptionProps> = ({
  description,
}) => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <>
      <Button
        marginY={2}
        backgroundColor={"teal.500"}
        onClick={() => navigate(`/room/${params.roomName}/edit`)}
      >
        <ArrowBigLeft color="white" />
      </Button>
      <Box borderWidth="1px" borderRadius="lg" p={4} bg="white" shadow="sm">
        <Text fontWeight="bold" fontSize="lg" color="teal.600">
          {description}
        </Text>
      </Box>
    </>
  );
};

export default ProfessorDescription;
