import { useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Input } from "@chakra-ui/react";
import TaskWrapper from "./TaskWrapper";

interface TableTaskProps {
  title: string;
  description: string;
  headers: string[];
  rows: number;
  onChange: (tableData: string[][]) => void;
}

const TableTask: React.FC<TableTaskProps> = ({
  title,
  description,
  headers,
  rows,
  onChange,
}) => {
  // Initialize the table with proper empty arrays
  const [tableData, setTableData] = useState<string[][]>(() =>
    Array.from({ length: rows }, () =>
      Array.from({ length: headers.length }, () => "")
    )
  );

  const handleCellChange = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    const newData = tableData.map((row, rIndex) =>
      rIndex === rowIndex
        ? [...row.slice(0, colIndex), value, ...row.slice(colIndex + 1)]
        : [...row]
    );
    setTableData(newData);
    onChange(newData);
  };

  return (
    <TaskWrapper title={title} description={description}>
      <Box overflowX="auto">
        <Table variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              {headers.map((header, index) => (
                <Th key={index} textAlign="center" color="teal.600">
                  {header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((row, rowIndex) => (
              <Tr key={rowIndex}>
                {headers.map((_, colIndex) => (
                  <Td key={colIndex}>
                    <Input
                      value={row[colIndex]}
                      onChange={(e) =>
                        handleCellChange(rowIndex, colIndex, e.target.value)
                      }
                      size="sm"
                      textAlign="center"
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
