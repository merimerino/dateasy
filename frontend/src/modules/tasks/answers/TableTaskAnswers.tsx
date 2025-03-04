import React, { useMemo, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Select,
} from "@chakra-ui/react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { useAnonymity } from "../../../contexts/AnonimityProvider";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface Answer {
  username: string;
  answer: string | Array<Array<string | number>>;
}

interface CombinedTableViewProps {
  answers: Answer[];
  headers: string;
}

interface ColumnStats {
  header: string;
  values: number[];
  sum: number;
  avg: number;
  min: number;
  max: number;
  count: number;
  frequencies: { [key: number]: number };
}

const TableTaskAnswers: React.FC<CombinedTableViewProps> = ({
  answers = [],
  headers = "",
}) => {
  const { t } = useTranslation();
  const { isAnonymous } = useAnonymity();
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const [selectedColumn, setSelectedColumn] = useState<number>(0);

  const headerArray = useMemo(
    () => headers.split(",").map((header) => header.trim()),
    [headers]
  );

  const processedData = useMemo<ColumnStats[]>(() => {
    if (!answers?.length || !headers) return [];

    const parsedAnswers = answers.map((answer) => {
      if (typeof answer.answer === "string") {
        const cleanAnswer = answer.answer.trim().replace(/^"|"$/g, "");
        return cleanAnswer.split(";").map((row) =>
          row.split(",").map((cell) => {
            const num = parseFloat(cell.trim());
            return isNaN(num) ? 0 : num;
          })
        );
      }
      return answer.answer.map((row) =>
        row.map((cell) => {
          const num =
            typeof cell === "string" ? parseFloat(cell.trim()) : Number(cell);
          return isNaN(num) ? 0 : num;
        })
      );
    });

    const combinedData: ColumnStats[] = headerArray.map((header) => ({
      header,
      values: [],
      sum: 0,
      avg: 0,
      min: Infinity,
      max: -Infinity,
      count: 0,
      frequencies: {},
    }));

    parsedAnswers.forEach((studentAnswer) => {
      studentAnswer.forEach((row) => {
        row.forEach((value, colIndex) => {
          if (!isNaN(value) && colIndex < combinedData.length) {
            combinedData[colIndex].values.push(value);
            combinedData[colIndex].sum += value;
            combinedData[colIndex].min = Math.min(
              combinedData[colIndex].min,
              value
            );
            combinedData[colIndex].max = Math.max(
              combinedData[colIndex].max,
              value
            );
            combinedData[colIndex].count++;
            combinedData[colIndex].frequencies[value] =
              (combinedData[colIndex].frequencies[value] || 0) + 1;
          }
        });
      });
    });

    combinedData.forEach((column) => {
      column.avg = column.count > 0 ? column.sum / column.count : 0;
    });

    return combinedData;
  }, [answers, headerArray, headers]);

  const barChartData: ChartData<"bar"> = {
    labels: processedData.map((column) => column.header),
    datasets: [
      {
        label: t("charts.average"),
        data: processedData.map((column) => column.avg),
        backgroundColor: "rgba(128, 90, 213, 0.6)",
        borderColor: "rgba(128, 90, 213, 1)",
        borderWidth: 1,
      },
      {
        label: t("charts.min"),
        data: processedData.map((column) => column.min),
        backgroundColor: "rgba(56, 178, 172, 0.6)",
        borderColor: "rgba(56, 178, 172, 1)",
        borderWidth: 1,
      },
      {
        label: t("charts.max"),
        data: processedData.map((column) => column.max),
        backgroundColor: "rgba(221, 107, 32, 0.6)",
        borderColor: "rgba(221, 107, 32, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieChartData: ChartData<"pie"> = {
    labels: processedData.map((column) => column.header),
    datasets: [
      {
        data: processedData.map((column) => column.avg),
        backgroundColor: [
          "rgba(128, 90, 213, 0.6)",
          "rgba(56, 178, 172, 0.6)",
          "rgba(221, 107, 32, 0.6)",
          "rgba(49, 151, 149, 0.6)",
          "rgba(113, 128, 150, 0.6)",
        ],
        borderColor: [
          "rgba(128, 90, 213, 1)",
          "rgba(56, 178, 172, 1)",
          "rgba(221, 107, 32, 1)",
          "rgba(49, 151, 149, 1)",
          "rgba(113, 128, 150, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const frequencyChartData: ChartData<"bar"> = {
    labels: processedData[selectedColumn]
      ? Object.keys(processedData[selectedColumn].frequencies).sort(
          (a, b) => Number(a) - Number(b)
        )
      : [],
    datasets: [
      {
        label: t("charts.frequency"),
        data: processedData[selectedColumn]
          ? Object.values(processedData[selectedColumn].frequencies)
          : [],
        backgroundColor: "rgba(128, 90, 213, 0.6)",
        borderColor: "rgba(128, 90, 213, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: t("charts.columnStatistics"),
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieChartOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: t("charts.averageValues"),
      },
    },
  };

  const frequencyChartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: t("charts.valueDistribution"),
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

  const StatsPanel = () => (
    <Box>
      <Box bg={bgColor} p={4} rounded="lg" shadow="sm" mb={8}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>{t("charts.column")}</Th>
              <Th isNumeric>{t("charts.average")}</Th>
              <Th isNumeric>{t("charts.min")}</Th>
              <Th isNumeric>{t("charts.max")}</Th>
              <Th isNumeric>{t("charts.count")}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {processedData.map((column, idx) => (
              <Tr key={idx}>
                <Td fontWeight="medium">{column.header}</Td>
                <Td isNumeric>{column.avg.toFixed(2)}</Td>
                <Td isNumeric>
                  {column.min === Infinity ? "-" : column.min.toFixed(2)}
                </Td>
                <Td isNumeric>
                  {column.max === -Infinity ? "-" : column.max.toFixed(2)}
                </Td>
                <Td isNumeric>{column.count}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Box bg={bgColor} p={4} rounded="lg" shadow="sm" mb={8}>
        <Select
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(Number(e.target.value))}
          mb={4}
        >
          {headerArray.map((header, idx) => (
            <option key={idx} value={idx}>
              {header}
            </option>
          ))}
        </Select>
        <Box height="400px">
          <Bar data={frequencyChartData} options={frequencyChartOptions} />
        </Box>
      </Box>

      <Box bg={bgColor} p={4} rounded="lg" shadow="sm" mb={8} height="400px">
        <Bar data={barChartData} options={barChartOptions} />
      </Box>

      <Box bg={bgColor} p={4} rounded="lg" shadow="sm" height="400px">
        <Pie data={pieChartData} options={pieChartOptions} />
      </Box>
    </Box>
  );

  const DataPanel = () => {
    const getRowsFromAnswer = (answer: Answer) => {
      if (typeof answer.answer === "string") {
        return answer.answer
          .trim()
          .replace(/^"|"$/g, "")
          .split(";")
          .map((row) => row.split(","));
      }
      return answer.answer.map((row) => row.map((v) => v.toString()));
    };

    return (
      <Box bg={bgColor} rounded="lg" shadow="sm">
        <Box maxH="700px" overflowY="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>{isAnonymous ? t("respondent") : t("username")}</Th>
                <Th>{t("charts.row")}</Th>
                {headerArray.map((header, idx) => (
                  <Th key={idx}>{header}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {answers.map((answer, answerIndex) => {
                const rows = getRowsFromAnswer(answer);
                return rows.map((row, rowIdx) => (
                  <Tr key={`${answer.username}-${rowIdx}`}>
                    {rowIdx === 0 && (
                      <Td rowSpan={rows.length} fontWeight="medium">
                        {isAnonymous
                          ? `${t("respondent")} ${answerIndex + 1}`
                          : answer.username}
                      </Td>
                    )}
                    <Td>{rowIdx + 1}</Td>
                    {row.map((value, colIdx) => (
                      <Td key={colIdx}>{value}</Td>
                    ))}
                  </Tr>
                ));
              })}
            </Tbody>
          </Table>
        </Box>
      </Box>
    );
  };

  if (!answers?.length || !headers) {
    return (
      <Box textAlign="center" py={8}>
        <Text color={textColor}>{t("charts.noAnswers")}</Text>
      </Box>
    );
  }

  return (
    <Tabs variant="enclosed" colorScheme="blue">
      <TabList>
        <Tab>{t("charts.statistics")}</Tab>
        <Tab>{t("charts.all")}</Tab>
      </TabList>
      <TabPanels pt={4}>
        <TabPanel>
          <StatsPanel />
        </TabPanel>
        <TabPanel>
          <DataPanel />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TableTaskAnswers;
