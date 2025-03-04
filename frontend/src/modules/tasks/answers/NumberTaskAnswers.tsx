import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  VStack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  IconButton,
  Input,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { GenericAnswer } from "../TaskForm/types";
import { useAnonymity } from "../../../contexts/AnonimityProvider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface NumberTaskAnswersProps {
  answers: GenericAnswer[];
  taskId: string;
  min: number;
  max: number;
}

const StatBox = ({ label, value }: { label: string; value: string }) => (
  <Box
    p={4}
    borderRadius="lg"
    border="1px"
    borderColor="gray.200"
    textAlign="center"
  >
    <Text fontWeight="bold" mb={2} color="gray.600">
      {label}
    </Text>
    <Text fontSize="xl">{value}</Text>
  </Box>
);

const EditableAnswersTableView: React.FC<{
  answers: GenericAnswer[];
  taskId: string;
  min: number;
  max: number;
  onAnswersUpdate: (newAnswers: GenericAnswer[]) => void;
}> = ({ answers, taskId, min, max, onAnswersUpdate }) => {
  const { t } = useTranslation();
  const { isAnonymous } = useAnonymity();
  const toast = useToast();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedAnswers, setEditedAnswers] = useState<GenericAnswer[]>(answers);
  const [editingStates, setEditingStates] = useState<boolean[]>(
    answers.map(() => false)
  );

  const validateNumber = (value: string): boolean => {
    const num = Number(value);
    return !isNaN(num) && num >= min && num <= max;
  };

  const handleEdit = (index: number) => {
    const newEditingStates = [...editingStates];
    newEditingStates[index] = true;
    setEditingStates(newEditingStates);
  };

  const handleDelete = (index: number) => {
    const newAnswers = editedAnswers.filter((_, i) => i !== index);
    setEditedAnswers(newAnswers);
  };

  const handleSaveRow = (index: number) => {
    if (!validateNumber(editedAnswers[index].answer)) {
      toast({
        title: t("invalidNumber"),
        description: t("numberOutOfRange", { min, max }),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const newEditingStates = [...editingStates];
    newEditingStates[index] = false;
    setEditingStates(newEditingStates);
  };

  const handleCancelRow = (index: number) => {
    const newEditingStates = [...editingStates];
    newEditingStates[index] = false;
    setEditingStates(newEditingStates);
    const newAnswers = [...editedAnswers];
    newAnswers[index] = answers[index];
    setEditedAnswers(newAnswers);
  };

  const handleAnswerChange = (index: number, newAnswer: string) => {
    const newAnswers = [...editedAnswers];
    newAnswers[index] = { ...newAnswers[index], answer: newAnswer };
    setEditedAnswers(newAnswers);
  };

  const handleSaveAll = async () => {
    // Validate all numbers
    const hasInvalidNumbers = editedAnswers.some(
      (answer) => !validateNumber(answer.answer)
    );

    if (hasInvalidNumbers) {
      toast({
        title: t("invalidNumbers"),
        description: t("numberOutOfRange", { min, max }),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const authToken = localStorage.getItem("token");
    if (!authToken) {
      navigate("/");
      throw new Error("Not authenticated");
    }

    try {
      const payload = {
        id: taskId,
        answers: editedAnswers.map((answer) => ({
          username: answer.username,
          answer: answer.answer,
        })),
      };

      const response = await fetch("http://localhost:3000/editAnswers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-jwt-token": authToken,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save answers");
      }

      toast({
        title: t("answersSaved"),
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setIsEditing(false);
      onAnswersUpdate(editedAnswers);
    } catch {
      toast({
        title: t("errorSavingAnswers"),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="100%" overflowX="auto">
      <HStack justifyContent="flex-end" mb={4}>
        {isEditing ? (
          <>
            <Button
              colorScheme="teal"
              onClick={handleSaveAll}
              leftIcon={<CheckIcon />}
            >
              {t("saveChanges")}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                setEditedAnswers(answers);
                setEditingStates(answers.map(() => false));
              }}
              leftIcon={<CloseIcon />}
            >
              {t("cancel")}
            </Button>
          </>
        ) : (
          <Button
            colorScheme="teal"
            leftIcon={<EditIcon />}
            onClick={() => setIsEditing(true)}
          >
            {t("editAnswers")}
          </Button>
        )}
      </HStack>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>{isAnonymous ? t("respondent") : t("username")}</Th>
            <Th>{t("answer")}</Th>
            {isEditing && <Th width="150px">{t("actions")}</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {editedAnswers.map((answer, index) => (
            <Tr key={`${answer.username}-${index}`}>
              <Td fontWeight="medium">
                {isAnonymous
                  ? `${t("respondent")} ${index + 1}`
                  : answer.username}
              </Td>
              <Td>
                {editingStates[index] ? (
                  <Input
                    value={answer.answer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    size="sm"
                    type="number"
                    min={min}
                    max={max}
                  />
                ) : (
                  answer.answer
                )}
              </Td>
              {isEditing && (
                <Td>
                  <HStack spacing={2}>
                    {editingStates[index] ? (
                      <>
                        <IconButton
                          icon={<CheckIcon />}
                          aria-label={t("save")}
                          size="sm"
                          colorScheme="green"
                          onClick={() => handleSaveRow(index)}
                        />
                        <IconButton
                          icon={<CloseIcon />}
                          aria-label={t("cancel")}
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleCancelRow(index)}
                        />
                      </>
                    ) : (
                      <>
                        <IconButton
                          icon={<EditIcon />}
                          aria-label={t("edit")}
                          size="sm"
                          colorScheme="teal"
                          onClick={() => handleEdit(index)}
                        />
                        <IconButton
                          icon={<DeleteIcon />}
                          aria-label={t("delete")}
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleDelete(index)}
                        />
                      </>
                    )}
                  </HStack>
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

const NumberTaskAnswers: React.FC<NumberTaskAnswersProps> = ({
  answers = [],
  taskId,
  min,
  max,
}) => {
  const { t } = useTranslation();
  const [currentAnswers, setCurrentAnswers] =
    useState<GenericAnswer[]>(answers);

  const stats = useMemo(() => {
    if (!currentAnswers?.length) return null;

    const numericAnswers = currentAnswers.map((a) => Number(a.answer));
    return {
      average:
        numericAnswers.reduce((a, b) => a + b, 0) / currentAnswers.length,
      median: numericAnswers.sort((a, b) => a - b)[
        Math.floor(currentAnswers.length / 2)
      ],
      min: Math.min(...numericAnswers),
      max: Math.max(...numericAnswers),
    };
  }, [currentAnswers]);

  const frequencyData = useMemo(() => {
    if (!currentAnswers?.length) return { labels: [], counts: [] };

    const frequencies: { [key: number]: number } = {};
    currentAnswers.forEach((answer) => {
      const value = Number(answer.answer);
      if (!Number.isFinite(value)) return;
      frequencies[value] = (frequencies[value] || 0) + 1;
    });

    const sortedValues = Object.keys(frequencies)
      .map(Number)
      .sort((a, b) => a - b);

    return {
      labels: sortedValues.map((value) => value.toString()),
      counts: sortedValues.map((value) => frequencies[value]),
    };
  }, [currentAnswers]);

  if (!currentAnswers?.length) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="gray.500">{t("noAnswersYet")}</Text>
      </Box>
    );
  }

  const chartData = {
    labels: frequencyData.labels,
    datasets: [
      {
        label: t("numberOfAnswers"),
        data: frequencyData.counts,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: t("distributionOfAnswers"),
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  if (!stats) return null;

  return (
    <Box w="100%">
      <Tabs variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab>{t("analysis")}</Tab>
          <Tab>{t("allAnswers")}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack spacing={8}>
              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} w="100%">
                <StatBox
                  label={t("average")}
                  value={stats.average.toFixed(2)}
                />
                <StatBox label={t("median")} value={stats.median.toFixed(2)} />
                <StatBox label={t("min")} value={stats.min.toFixed(2)} />
                <StatBox label={t("max")} value={stats.max.toFixed(2)} />
              </SimpleGrid>

              <Box h="400px" w="100%">
                <Bar options={options} data={chartData} />
              </Box>
            </VStack>
          </TabPanel>

          <TabPanel>
            <EditableAnswersTableView
              answers={currentAnswers}
              taskId={taskId}
              min={min}
              max={max}
              onAnswersUpdate={setCurrentAnswers}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default NumberTaskAnswers;
