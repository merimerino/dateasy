import React from "react";
import {
  Box,
  Heading,
  HStack,
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
} from "@chakra-ui/react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { GenericAnswer } from "../TaskForm/types";
import { useAnonymity } from "../../../contexts/AnonimityProvider";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface MultiChoiceAnswersProps {
  answers: GenericAnswer[];
  options: string[];
}

const MultiChoiceAnswers: React.FC<MultiChoiceAnswersProps> = ({
  answers = [],
  options = [],
}) => {
  const { t } = useTranslation();
  const { isAnonymous } = useAnonymity();

  if (!answers?.length) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="gray.500">{t("noAnswersYet")}</Text>
      </Box>
    );
  }

  const answerCounts = options.reduce((acc, option) => {
    acc[option] = answers.filter((a) => a.answer === option).length;
    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: options,
    datasets: [
      {
        data: options.map((option) => answerCounts[option]),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Box w="100%">
      <Tabs variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab>{t("analysis")}</Tab>
          <Tab>{t("allAnswers")}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <HStack spacing={8} justify="center" align="start">
              <Box w="300px" h="300px">
                <Heading size="sm" textAlign="center" mb={4}>
                  {t("pieDistribution")}
                </Heading>
                <Pie data={chartData} />
              </Box>
              <Box w="400px" h="300px">
                <Heading size="sm" textAlign="center" mb={4}>
                  {t("barDistribution")}
                </Heading>
                <Bar data={chartData} options={barOptions} />
              </Box>
            </HStack>
          </TabPanel>
          <TabPanel>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>{isAnonymous ? t("respondent") : t("username")}</Th>
                  <Th>{t("answer")}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {answers.map((answer, index) => (
                  <Tr key={`${answer.username}-${index}`}>
                    <Td>
                      {isAnonymous
                        ? `${t("respondent")} ${index + 1}`
                        : answer.username}
                    </Td>
                    <Td>{answer.answer}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MultiChoiceAnswers;
