type Props = {
  title: string;
  message: string;
};

export default function ResultBlock({ title, message }: Props) {
  return (
    <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-4 my-2">
      <h4 className="font-bold mb-2">{title}</h4>
      <div>{message}</div>
    </div>
  );
}