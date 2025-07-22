type TruncateTextProps = {
  text: string;
  maxLength: number;
};

const TruncateText = ({ text, maxLength }: TruncateTextProps) => {
  const truncated = text.length > maxLength
    ? text.substring(0, maxLength - 3) + '...'
    : text;

  return <span title={text}>{truncated}</span>;
};

export default TruncateText
