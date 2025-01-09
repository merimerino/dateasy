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
  Text,
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
import { useTranslation } from "react-i18next";
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
  headers: string;
}

const TableTaskAnswers: React.FC<TableTaskAnswersProps> = ({
  answers = [],
  headers = "",
}) => {
  const { t } = useTranslation();

  const headerArray = useMemo(
    () => headers.split(",").map((header) => header.trim()),
    [headers]
  );

  const stats = useMemo(() => {
    if (!answers?.length || !headers) return [];

    return headerArray
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
  }, [answers, headerArray, headers]);

  if (!answers?.length || !headers) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="gray.500">{t("noAnswersYet")}</Text>
      </Box>
    );
  }

  const chartData = {
    labels: stats.map((stat) => stat!.header),
    datasets: [
      {
        label: t("averageValue"),
        data: stats.map((stat) => stat!.average),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: t("minValue"),
        data: stats.map((stat) => stat!.min),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: t("maxValue"),
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
        text: t("columnStatistics"),
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (!stats.length) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="gray.500">{t("noValidData")}</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={8} align="stretch">
      <Box overflowX="auto">
        <Heading size="sm" mb={4}>
          {t("columnStatistics")}
        </Heading>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>{t("column")}</Th>
              <Th isNumeric>{t("average")}</Th>
              <Th isNumeric>{t("min")}</Th>
              <Th isNumeric>{t("max")}</Th>
              <Th isNumeric>{t("count")}</Th>
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
                text: t("valueTrends"),
              },
            },
          }}
          data={chartData}
        />
      </Box>

      <Box>
        <Heading size="sm" mb={4}>
          {t("rawAnswers")}
        </Heading>
        <Box maxH="300px" overflowY="auto">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>{t("user")}</Th>
                {headerArray.map((header) => (
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
