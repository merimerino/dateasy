import React, { useState, useEffect, useRef } from "react";
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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  IconButton,
  Button,
  HStack,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import cloud from "d3-cloud";
import * as d3 from "d3";
import { useTranslation } from "react-i18next";
import { useAnonymity } from "../../../contexts/AnonimityProvider";
import { GenericAnswer } from "../TaskForm/types";

interface ShortTaskAnswersProps {
  answers: GenericAnswer[];
  taskId: string;
}

interface CloudWord extends cloud.Word {
  value: number;
  size: number;
}

const WordCloudView: React.FC<{ answers: GenericAnswer[] }> = ({ answers }) => {
  const { t } = useTranslation();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerColor = useColorModeValue("gray.50", "gray.700");

  useEffect(() => {
    if (!answers.length || !svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    // Process words and count frequencies
    const wordCounts = answers.reduce((acc: Record<string, number>, answer) => {
      answer.answer
        .toLowerCase()
        .split(";")
        .map((phrase) => phrase.trim())
        .filter((phrase) => phrase.length > 0)
        .forEach((phrase) => {
          acc[phrase] = (acc[phrase] || 0) + 1;
        });
      return acc;
    }, {});

    const words: CloudWord[] = Object.entries(wordCounts).map(
      ([text, value]) => ({
        text,
        size: value * 12 + 16,
        value,
      })
    );

    cloud<CloudWord>()
      .size([600, 300])
      .words(words)
      .padding(5)
      .rotate(() => (Math.random() - 0.5) * 30)
      .fontSize((d) => d.size)
      .on("end", (words) => {
        d3.select(svgRef.current)
          .attr("viewBox", "0 0 600 300")
          .append("g")
          .attr("transform", "translate(300,150)")
          .selectAll("text")
          .data(words)
          .join("text")
          .style("font-size", (d) => `${d.size}px`)
          .style("font-family", "Impact")
          .style("fill", (d) => {
            const colors = [
              "#2D3282", // blue
              "#E6447D", // pink
              "#28A745", // green
              "#9333EA", // purple
              "#F59E0B", // amber
              "#10B981", // emerald
              "#3B82F6", // bright blue
              "#EC4899", // hot pink
            ];
            return colors[d.value % colors.length];
          })
          .style("cursor", "pointer")
          .attr("text-anchor", "middle")
          .attr(
            "transform",
            (d) => `translate(${d.x ?? 0},${d.y ?? 0})rotate(${d.rotate ?? 0})`
          )
          .text((d) => d.text as string)
          .on("click", (_, d) => {
            console.log(t("wordAppears", { word: d.text, count: d.value }));
          });
      })
      .start();
  }, [answers, t]);

  return (
    <Box w="100%" px={4} bg={containerColor} borderRadius="md" py={4}>
      <svg
        ref={svgRef}
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "70vh",
        }}
      />
    </Box>
  );
};

const EditableAnswersTableView: React.FC<{
  answers: GenericAnswer[];
  taskId: string;
}> = ({ answers, taskId }) => {
  const { t } = useTranslation();
  const { isAnonymous } = useAnonymity();
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedAnswers, setEditedAnswers] = useState<GenericAnswer[]>(answers);
  const [editingStates, setEditingStates] = useState<boolean[]>(
    answers.map(() => false)
  );
  const navigate = useNavigate();

  useEffect(() => {
    setEditedAnswers(answers);
    setEditingStates(answers.map(() => false));
  }, [answers]);

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
    const newEditingStates = [...editingStates];
    newEditingStates[index] = false;
    setEditingStates(newEditingStates);
  };

  const handleCancelRow = (index: number) => {
    const newEditingStates = [...editingStates];
    newEditingStates[index] = false;
    setEditingStates(newEditingStates);

    // Revert the specific answer back to original
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
      console.log(payload);

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

const ShortTaskAnswers: React.FC<ShortTaskAnswersProps> = ({
  answers = [],
  taskId,
}) => {
  const { t } = useTranslation();

  if (!answers?.length) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="gray.500">{t("noAnswersYet")}</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={6} w="100%">
      <Tabs w="100%" variant="enclosed" colorScheme="teal">
        <TabList>
          <Tab>{t("wordCloudAnswers")}</Tab>
          <Tab>{t("allAnswers")}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <WordCloudView answers={answers} />
          </TabPanel>
          <TabPanel>
            <EditableAnswersTableView answers={answers} taskId={taskId} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default ShortTaskAnswers;
