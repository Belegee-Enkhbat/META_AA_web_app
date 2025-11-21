export default function LoadingBlock({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 my-2">
      <span className="animate-spin text-blue-600">⏳</span>
      <span>{message}</span>
    </div>
  );
}