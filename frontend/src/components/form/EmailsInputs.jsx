import { Textarea } from "@/components/ui/textarea";

export default function EmailsInput({ register }) {
  return (
    <div>
      <label className="text-sm font-medium">HR Emails</label>
      <Textarea
        rows={4}
        {...register("emails")}
        placeholder="hr@company.com, Company"
      />
      <p className="text-xs text-muted-foreground">
        One per line — email, company
      </p>
    </div>
  );
}
