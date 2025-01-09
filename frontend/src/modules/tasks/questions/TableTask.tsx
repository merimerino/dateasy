import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Input, Box } from "@chakra-ui/react";
import TaskWrapper from "../TaskWrapper";

interface TableTaskProps {
  id: string;
  task_type: string;
  name: string;
  text: string;
  room_name: string;
  order_number: number;
  columns?: string;
  rows?: number;
  onChange?: (data: string) => void;
}

const TableTask: React.FC<TableTaskProps> = ({
  name,
  text,
  columns = "",
  rows = 3,
  onChange,
}) => {
  const columnNames = columns
    ? columns.split(",").map((col) => col.trim())
    : [];

  const [tableData, setTableData] = useState<Array<{ [key: string]: string }>>(
    Array(rows)
      .fill(null)
      .map(() => columnNames.reduce((acc, col) => ({ ...acc, [col]: "" }), {}))
  );

  const formatTableDataForSubmission = (
    data: Array<{ [key: string]: string }>
  ): string => {
    return data
      .map((row) => columnNames.map((col) => row[col]).join(","))
      .join(";");
  };

  const handleCellChange = (
    rowIndex: number,
    columnName: string,
    value: string
  ) => {
    const newData = [...tableData];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [columnName]: value,
    };
    setTableData(newData);

    const formattedData = formatTableDataForSubmission(newData);
    onChange?.(formattedData);
  };

  return (
    <TaskWrapper title={name} description={text}>
      <Box overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              {columnNames.map((col, index) => (
                <Th key={index} bg="gray.50" borderColor="gray.200">
                  {col}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((row, rowIndex) => (
              <Tr key={rowIndex}>
                {columnNames.map((col, colIndex) => (
                  <Td key={colIndex} borderColor="gray.200" padding="1">
                    <Input
                      value={row[col]}
                      onChange={(e) =>
                        handleCellChange(rowIndex, col, e.target.value)
                      }
                      size="md"
                      borderColor="teal.200"
                      _focus={{ borderColor: "teal.400" }}
                    />
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </TaskWrapper>
  );
};

export default TableTask;
