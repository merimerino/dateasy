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
  answers,
  min,
  max,
}) => {
  const stats = useMemo(() => {
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

  // Create bins for histogram
  const binCount = 10;
  const binSize = (max - min) / binCount;
  const bins = Array.from({ length: binCount }, (_, i) => ({
    start: min + i * binSize,
    end: min + (i + 1) * binSize,
    count: 0,
  }));

  // Fill bins
  answers.forEach((answer) => {
    const value = Number(answer.answer);
    const binIndex = Math.min(
      Math.floor((value - min) / binSize),
      binCount - 1
    );
    bins[binIndex].count++;
  });

  const chartData = {
    labels: bins.map(
      (bin) => `${bin.start.toFixed(1)} - ${bin.end.toFixed(1)}`
    ),
    datasets: [
      {
        label: "Number of Answers",
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
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Distribution of Answers",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <VStack spacing={8} align="stretch">
      <Box>
        <Heading size="sm" mb={4}>
          Statistics
        </Heading>
        <HStack spacing={8} justify="center">
          <VStack>
            <Text fontWeight="bold">Average</Text>
            <Text>{stats.average.toFixed(2)}</Text>
          </VStack>
          <VStack>
            <Text fontWeight="bold">Median</Text>
            <Text>{stats.median.toFixed(2)}</Text>
          </VStack>
          <VStack>
            <Text fontWeight="bold">Min</Text>
            <Text>{stats.min.toFixed(2)}</Text>
          </VStack>
          <VStack>
            <Text fontWeight="bold">Max</Text>
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
