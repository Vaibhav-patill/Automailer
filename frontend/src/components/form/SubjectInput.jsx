import { Input } from "@/components/ui/input";

export default function SubjectInput({ register }) {
  return (
    <div>
      <label className="text-sm font-medium">Email Subject</label>
      <Input {...register("subject")} />
      <p className="text-xs text-muted-foreground">
        Use <code>{"{{company}}"}</code> for personalization
      </p>
    </div>
  );
}
