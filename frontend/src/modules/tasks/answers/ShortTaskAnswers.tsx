import React from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { TagCloud } from "react-tagcloud";
import { ShortAnswer } from "../../../types/Tasks";

interface ShortTaskAnswersProps {
  answers: ShortAnswer[];
}

interface WordCount {
  value: string;
  count: number;
}

const ShortTaskAnswers: React.FC<ShortTaskAnswersProps> = ({ answers }) => {
  const wordCounts = answers.reduce((acc: Record<string, number>, answer) => {
    const words = answer.answer
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/);

    words.forEach((word) => {
      if (word.length > 2) {
        // Ignore short words
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
      <Heading size="sm">Word Cloud of Answers</Heading>
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
            console.log(`${tag.value} appears ${tag.count} times`)
          }
        />
      </Box>
    </VStack>
  );
};

export default ShortTaskAnswers;
