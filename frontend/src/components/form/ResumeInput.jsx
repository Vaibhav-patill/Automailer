export default function ResumeInput({ register }) {
  return (
    <div>
      <label className="text-sm font-medium">Resume (PDF)</label>
      <input
        type="file"
        accept=".pdf"
        {...register("resume")}
      />
    </div>
  );
}
