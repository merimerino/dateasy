import React, { useMemo } from "react";
import {
  Box,
  Heading,
  VStack,
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
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { TableAnswer } from "../../../types/Tasks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TableTaskAnswersProps {
  answers: TableAnswer[];
  headers: string[];
}

const TableTaskAnswers: React.FC<TableTaskAnswersProps> = ({
  answers,
  headers,
}) => {
  const stats = useMemo(() => {
    // Calculate statistics for each column
    return headers
      .map((header, colIndex) => {
        const columnValues = answers
          .map((answer) =>
            answer.answer.map((row) => parseFloat(row[colIndex]))
          )
          .flat()
          .filter((value) => !isNaN(value));

        if (columnValues.length === 0) return null;

        return {
          header,
          average:
            columnValues.reduce((a, b) => a + b, 0) / columnValues.length,
          min: Math.min(...columnValues),
          max: Math.max(...columnValues),
          count: columnValues.length,
        };
      })
      .filter(Boolean);
  }, [answers, headers]);

  const chartData = {
    labels: stats.map((stat) => stat!.header),
    datasets: [
      {
        label: "Average Value",
        data: stats.map((stat) => stat!.average),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Min Value",
        data: stats.map((stat) => stat!.min),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Max Value",
        data: stats.map((stat) => stat!.max),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
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
        text: "Column Statistics",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <VStack spacing={8} align="stretch">
      <Box overflowX="auto">
        <Heading size="sm" mb={4}>
          Column Statistics
        </Heading>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Column</Th>
              <Th isNumeric>Average</Th>
              <Th isNumeric>Min</Th>
              <Th isNumeric>Max</Th>
              <Th isNumeric>Count</Th>
            </Tr>
          </Thead>
          <Tbody>
            {stats.map((stat) => (
              <Tr key={stat!.header}>
                <Td>{stat!.header}</Td>
                <Td isNumeric>{stat!.average.toFixed(2)}</Td>
                <Td isNumeric>{stat!.min.toFixed(2)}</Td>
                <Td isNumeric>{stat!.max.toFixed(2)}</Td>
                <Td isNumeric>{stat!.count}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Box h="400px">
        <Bar options={options} data={chartData} />
      </Box>

      <Box h="400px">
        <Line
          options={{
            ...options,
            plugins: {
              ...options.plugins,
              title: {
                display: true,
                text: "Value Trends",
              },
            },
          }}
          data={chartData}
        />
      </Box>

      <Box>
        <Heading size="sm" mb={4}>
          Raw Answers
        </Heading>
        <Box maxH="300px" overflowY="auto">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>User</Th>
                {headers.map((header) => (
                  <Th key={header}>{header}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {answers.map((answer, idx) => (
                <Tr key={`${answer.username}-${idx}`}>
                  <Td fontWeight="medium">{answer.username}</Td>
                  {answer.answer.map((row, colIdx) => (
                    <Td key={colIdx}>{row.join(", ")}</Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </VStack>
  );
};

export default TableTaskAnswers;
