'use client';
import { Button } from "@/components/ui/button";
import { ChatFlow } from "@/service/chatFlows";

type Props = {
  flows: Record<string, ChatFlow>;
  onSelect: (key: string) => void;
};

export default function ChatOptions({ flows, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
      {Object.entries(flows).map(([key, flow]) => (
        <Button
          key={key}
          variant="outline"
          className="justify-start gap-2 text-lg"
          onClick={() => onSelect(key)}
        >
          <span className="text-xl">{flow.icon}</span>
          {flow.label}
        </Button>
      ))}
    </div>
  );
}