import { Textarea } from "@/components/ui/textarea";

export default function TemplateInput({ register }) {
  return (
    <div>
      <label className="text-sm font-medium">Cold Mail Template</label>
      <Textarea
        rows={7}
        {...register("template")}
        placeholder="Use {{company}}"
      />
    </div>
  );
}
