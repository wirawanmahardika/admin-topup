type TruncateTextProps = {
  text: string;
  maxLength: number;
};

const TruncateText = ({ text, maxLength }: TruncateTextProps) => {
  const truncated = text.length > maxLength
    ? text.substring(0, maxLength - 3) + '...'
    : text;

  return <p title={text}>{truncated}</p>;
};

export default TruncateText
