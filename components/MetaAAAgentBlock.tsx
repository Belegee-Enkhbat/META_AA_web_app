// /components/MetaAAAgentBlock.tsx
export type MetaAAAgentStep = { bot: string; user?: string };

export const metaAAAgentSteps: MetaAAAgentStep[] = [
  {
    bot: "クライアントから質問があります。広告のパフォーマンスについて分析をお願いします。",
    user: "I have a question from my client. Please analyse the performance of your ads.",
  },
  {
    bot: "かしこまりました。Meta AA Agentが対応します。クライアントの知りたいことを詳しく教えてください。",
    user: "Shiseidoのキャンペーンで、デジタル広告がオフライン売上にどの程度貢献しているか知りたいとのことです。TrueLift分析をお願いします。",
  },
  {
    bot: "要件定義エージェント が分析中...",
    user: "はい、その分析でお願いします",
  },
  {
    bot: "商品情報確認中...",
    user: "はい、正しいです",
  },
  {
    bot: "データ準備エージェント がデータソースを確認中...",
    user: "はい、推奨通りでお願いします",
  },
  {
    bot: "Tobirasプラットフォーム内で、現在Yahoo!ショッピングのデータセットを使用予定です。このまま進めてよろしいですか？",
    user: "Tobirasの中でRakutenのデータセットに切り替えてください。",
  },
  {
    bot: "分析準備完了。分析を開始しますか？",
    user: "はい、開始してください",
  },
  {
    bot: "分析を開始します...",
  },
  {
    bot: "分析が完了しました！TrueLift分析レポートを作成しました。",
  },
];

type Props = {
  step: number;
  onNext: () => void;
  isLast: boolean;
};

export default function MetaAAAgentBlock({ step, onNext, isLast }: Props) {
  return (
    <div className="meta-aa-block bg-white p-4 rounded-lg border my-2">
      <div className="mb-2 font-bold">Meta AA Agent</div>
      {!isLast && (
        <button className="apply-btn mt-2" onClick={onNext}>
          Next
        </button>
      )}
      {isLast && <div className="text-green-700 font-bold mt-2">分析完了！</div>}
    </div>
  );
}