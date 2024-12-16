import React, { useMemo } from "react";
import { Box, Heading, HStack, VStack, Text } from "@chakra-ui/react";
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
import { NumberAnswer } from "../../../types/Tasks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface NumberTaskAnswersProps {
  answers: NumberAnswer[];
  min: number;
  max: number;
}

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

  // Ensure min and max are valid numbers and min is less than max
  const validMin = Number.isFinite(min) ? min : 0;
  const validMax = Number.isFinite(max) ? max : 100;
  const binCount = 10;
  const binSize = Math.max((validMax - validMin) / binCount, 0.0001); // Prevent division by zero

  const bins = Array.from({ length: binCount }, (_, i) => ({
    start: validMin + i * binSize,
    end: validMin + (i + 1) * binSize,
    count: 0,
  }));

  answers.forEach((answer) => {
    const value = Number(answer.answer);
    if (!Number.isFinite(value)) return; // Skip invalid numbers

    const binIndex = Math.floor((value - validMin) / binSize);

    // Ensure binIndex is within valid bounds
    if (binIndex >= 0 && binIndex < binCount) {
      bins[binIndex].count++;
    } else if (binIndex >= binCount) {
      // Add to the last bin if value is greater than max
      bins[binCount - 1].count++;
    } else if (binIndex < 0) {
      // Add to the first bin if value is less than min
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
    <VStack spacing={8} align="stretch">
      <Box>
        <Heading size="sm" mb={4}>
          {t("statistics")}
        </Heading>
        <HStack spacing={8} justify="center">
          <VStack>
            <Text fontWeight="bold">{t("average")}</Text>
            <Text>{stats.average.toFixed(2)}</Text>
          </VStack>
          <VStack>
            <Text fontWeight="bold">{t("median")}</Text>
            <Text>{stats.median.toFixed(2)}</Text>
          </VStack>
          <VStack>
            <Text fontWeight="bold">{t("min")}</Text>
            <Text>{stats.min.toFixed(2)}</Text>
          </VStack>
          <VStack>
            <Text fontWeight="bold">{t("max")}</Text>
            <Text>{stats.max.toFixed(2)}</Text>
          </VStack>
        </HStack>
      </Box>

      <Box h="400px">
        <Bar options={options} data={chartData} />
      </Box>
    </VStack>
  );
};

export default NumberTaskAnswers;
