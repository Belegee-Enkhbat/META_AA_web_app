export default function ChatHeader() {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-t-2xl bg-blue-700 text-white px-8 py-4 flex items-center gap-4">
      <div className="rounded-full bg-white w-10 h-10 flex items-center justify-center text-blue-700 font-bold text-xl">AI</div>
      <div>
        <div className="font-bold text-lg">Marketing AI Superagent</div>
        <div className="text-green-300 text-xs">● オンライン・いつでもサポートします</div>
      </div>
    </div>
  );
}