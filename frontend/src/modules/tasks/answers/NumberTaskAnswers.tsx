import React, { useMemo } from "react";
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
} from "@chakra-ui/react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface NumberAnswer {
  answer: string;
  username: string;
}

interface NumberTaskAnswersProps {
  answers: NumberAnswer[];
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

const NumberTaskAnswers: React.FC<NumberTaskAnswersProps> = ({
  answers = [],
  min,
  max,
}) => {
  const { t } = useTranslation();

  const stats = useMemo(() => {
    if (!answers?.length) return null;

    const numericAnswers = answers.map((a) => Number(a.answer));
    return {
      average: numericAnswers.reduce((a, b) => a + b, 0) / answers.length,
      median: numericAnswers.sort((a, b) => a - b)[
        Math.floor(answers.length / 2)
      ],
      min: Math.min(...numericAnswers),
      max: Math.max(...numericAnswers),
    };
  }, [answers]);

  if (!answers?.length) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="gray.500">{t("noAnswersYet")}</Text>
      </Box>
    );
  }

  const validMin = Number.isFinite(min) ? min : 0;
  const validMax = Number.isFinite(max) ? max : 100;
  const binCount = 10;
  const binSize = Math.max((validMax - validMin) / binCount, 0.0001);

  const bins = Array.from({ length: binCount }, (_, i) => ({
    start: validMin + i * binSize,
    end: validMin + (i + 1) * binSize,
    count: 0,
  }));

  answers.forEach((answer) => {
    const value = Number(answer.answer);
    if (!Number.isFinite(value)) return;

    const binIndex = Math.floor((value - validMin) / binSize);

    if (binIndex >= 0 && binIndex < binCount) {
      bins[binIndex].count++;
    } else if (binIndex >= binCount) {
      bins[binCount - 1].count++;
    } else if (binIndex < 0) {
      bins[0].count++;
    }
  });

  const chartData = {
    labels: bins.map(
      (bin) => `${bin.start.toFixed(1)} - ${bin.end.toFixed(1)}`
    ),
    datasets: [
      {
        label: t("numberOfAnswers"),
        data: bins.map((bin) => bin.count),
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
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>{t("username")}</Th>
                  <Th>{t("answer")}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {answers.map((answer, index) => (
                  <Tr key={`${answer.username}-${index}`}>
                    <Td>{answer.username}</Td>
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

export default NumberTaskAnswers;
