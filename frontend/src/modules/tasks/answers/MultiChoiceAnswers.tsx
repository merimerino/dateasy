import React from "react";
import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
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
import { MultipleChoiceAnswer } from "../../../types/Tasks";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface MultiChoiceAnswersProps {
  answers: MultipleChoiceAnswer[];
  options: string[];
}

const MultiChoiceAnswers: React.FC<MultiChoiceAnswersProps> = ({
  answers,
  options,
}) => {
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

  return (
    <VStack spacing={8} align="stretch">
      <HStack spacing={8} justify="center">
        <Box w="300px" h="300px">
          <Heading size="sm" textAlign="center" mb={4}>
            Distribution (Pie)
          </Heading>
          <Pie data={chartData} />
        </Box>
        <Box w="400px" h="300px">
          <Heading size="sm" textAlign="center" mb={4}>
            Distribution (Bar)
          </Heading>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
            }}
          />
        </Box>
      </HStack>
    </VStack>
  );
};

export default MultiChoiceAnswers;
