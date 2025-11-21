type Props = {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled?: boolean;
};

export default function ChatInput({ value, onChange, onSend, disabled }: Props) {
  return (
    <form
      className="flex items-center gap-2"
      onSubmit={e => {
        e.preventDefault();
        if (!disabled && value.trim()) onSend();
      }}
    >
      <input
        className="flex-1 border rounded px-3 py-2"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="メッセージを入力してください..."
        disabled={disabled}
      />
      <button type="submit" className="send-btn" disabled={disabled || !value.trim()}>
        送信
      </button>
    </form>
  );
}