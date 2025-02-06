import {Box} from '@/shared/components/Box';
import {Text} from '@/shared/components/Typography';
import React from 'react';

interface BracketTextProps {
  text: string;
}

const BracketText: React.FC<BracketTextProps> = ({text}) => {
  const parseBracketText = (text: string) => {
    const regex = /(.*?)\s*\[(.*?)\]$/;
    const match = text.match(regex);

    if (match) {
      return {
        main: match[1].trim(),
        bracket: match[2].trim(),
      };
    }

    return {
      main: text,
      bracket: '',
    };
  };

  const {main, bracket} = parseBracketText(text);

  return (
    <Box flexDirection="row" columnGap="md" alignItems={'center'}>
      <Text fontSize={14}>{main}</Text>
      {bracket && (
        <Text fontSize={12} color={'gray400'}>
          {bracket}
        </Text>
      )}
    </Box>
  );
};

export default BracketText;
