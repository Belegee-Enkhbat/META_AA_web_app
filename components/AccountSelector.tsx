import { Account } from "@/types/chat";

type Props = {
  accounts: Account[];
  value: string;
  onChange: (v: string) => void;
  onConfirm: () => void;
};

export default function AccountSelector({ accounts, value, onChange, onConfirm }: Props) {
  return (
    <div className="account-selector flex gap-2 items-center my-2">
      <select
        className="border rounded px-3 py-2"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="">アカウントを選択してください</option>
        {accounts.map(acc => (
          <option key={acc.id} value={acc.id}>{acc.id} - {acc.name}</option>
        ))}
      </select>
      <button className="confirm-btn" onClick={onConfirm} disabled={!value}>確認</button>
    </div>
  );
}