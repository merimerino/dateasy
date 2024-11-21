import React from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { TagCloud } from "react-tagcloud";
import { useTranslation } from "react-i18next";
import { ShortAnswer } from "../../../types/Tasks";

interface ShortTaskAnswersProps {
  answers: ShortAnswer[];
}

interface WordCount {
  value: string;
  count: number;
}

const ShortTaskAnswers: React.FC<ShortTaskAnswersProps> = ({ answers }) => {
  const { t } = useTranslation();

  const wordCounts = answers.reduce((acc: Record<string, number>, answer) => {
    const words = answer.answer
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/);

    words.forEach((word) => {
      if (word.length > 2) {
        acc[word] = (acc[word] || 0) + 1;
      }
    });
    return acc;
  }, {});

  const cloudData = Object.entries(wordCounts).map(([word, count]) => ({
    value: word,
    count,
  }));

  const options = {
    luminosity: "dark",
    hue: "teal",
  } as const;

  return (
    <VStack spacing={6}>
      <Heading size="sm">{t("wordCloudAnswers")}</Heading>
      <Box
        h="400px"
        w="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <TagCloud
          minSize={12}
          maxSize={35}
          tags={cloudData}
          colorOptions={options}
          onClick={(tag: WordCount) =>
            console.log(
              `${t("wordAppears", { word: tag.value, count: tag.count })}`
            )
          }
        />
      </Box>
    </VStack>
  );
};

export default ShortTaskAnswers;
