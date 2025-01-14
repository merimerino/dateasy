import React from "react";
import {
  Box,
  VStack,
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
import cloud from "d3-cloud";
import * as d3 from "d3";
import { useTranslation } from "react-i18next";
import { GenericAnswer } from "../TaskForm/types";
import { useAnonymity } from "../../../contexts/AnonimityProvider";

interface ShortTaskAnswersProps {
  answers: GenericAnswer[];
}

interface CloudWord extends cloud.Word {
  value: number;
  size: number;
}

const WordCloudView: React.FC<{ answers: GenericAnswer[] }> = ({ answers }) => {
  const { t } = useTranslation();
  const svgRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    if (!answers.length || !svgRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const wordCounts = answers.reduce((acc: Record<string, number>, answer) => {
      answer.answer
        .toLowerCase()
        .split(";")
        .map((phrase) => phrase.trim())
        .filter((phrase) => phrase.length > 0)
        .forEach((phrase) => {
          acc[phrase] = (acc[phrase] || 0) + 1;
        });
      return acc;
    }, {});

    const words: CloudWord[] = Object.entries(wordCounts).map(
      ([text, value]) => ({
        text,
        size: Math.log2(value) * 5 + 16,
        value,
      })
    );

    cloud<CloudWord>()
      .size([600, 300])
      .words(words)
      .padding(5)
      .rotate(() => (Math.random() - 0.5) * 30)
      .fontSize((d) => d.size)
      .on("end", (words) => {
        d3.select(svgRef.current)
          .attr("viewBox", "0 0 600 300")
          .append("g")
          .attr("transform", "translate(300,150)")
          .selectAll("text")
          .data(words)
          .join("text")
          .style("font-size", (d) => `${d.size}px`)
          .style("font-family", "Impact")
          .style("fill", (d) => {
            const colors = [
              "#2D3282", // blue
              "#E6447D", // pink
              "#28A745", // green
              "#9333EA", // purple
              "#F59E0B", // amber
              "#10B981", // emerald
              "#3B82F6", // bright blue
              "#EC4899", // hot pink
            ];
            return colors[d.value % colors.length];
          })
          .style("cursor", "pointer")
          .attr("text-anchor", "middle")
          .attr(
            "transform",
            (d) => `translate(${d.x ?? 0},${d.y ?? 0})rotate(${d.rotate ?? 0})`
          )
          .text((d) => d.text as string)
          .on("click", (_, d) => {
            console.log(t("wordAppears", { word: d.text, count: d.value }));
          });
      })
      .start();
  }, [answers, t]);

  return (
    <Box w="100%" px={4}>
      <svg
        ref={svgRef}
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "70vh",
        }}
      />
    </Box>
  );
};

const AnswersTableView: React.FC<{ answers: GenericAnswer[] }> = ({
  answers,
}) => {
  const { t } = useTranslation();
  const { isAnonymous } = useAnonymity();

  return (
    <Box w="100%" overflowX="auto">
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
              <Td fontWeight="medium">
                {isAnonymous
                  ? `${t("respondent")} ${index + 1}`
                  : answer.username}
              </Td>
              <Td>{answer.answer}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

const ShortTaskAnswers: React.FC<ShortTaskAnswersProps> = ({
  answers = [],
}) => {
  const { t } = useTranslation();

  if (!answers?.length) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="gray.500">{t("noAnswersYet")}</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={6} w="100%">
      <Tabs w="100%" variant="enclosed" colorScheme="teal">
        <TabList>
          <Tab>{t("wordCloudAnswers")}</Tab>
          <Tab>{t("allAnswers")}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <WordCloudView answers={answers} />
          </TabPanel>
          <TabPanel>
            <AnswersTableView answers={answers} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default ShortTaskAnswers;
