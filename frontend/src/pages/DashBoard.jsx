import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mailSchema } from "@/lib/schema";
import { api } from "@/lib/api";
import CardLayout from "../components/layout/CardLayout";
import SubjectInput from "../components/form/SubjectInput";
import EmailsInput from "../components/form/EmailsInputs";
import TemplateInput from "../components/form/TemplateInput";
import ResumeInput from "../components/form/ResumeInput";
import SubmitButton from "../components/form/SubmitButton";



export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(mailSchema),
    defaultValues: {
      subject: "Internship Application – {{company}}",
    },
  });

  const onSubmit = async (data) => {
    const emailArray = data.emails
      .split("\n")
      .map((line) => {
        const [email, company] = line.split(",");
        return { email: email?.trim(), company: company?.trim() || "" };
      })
      .filter((e) => e.email);

    const formData = new FormData();
    formData.append("subject", data.subject);
    formData.append("template", data.template);
    formData.append("emails", JSON.stringify(emailArray));
    formData.append("resume", data.resume[0]);

    try {
      setLoading(true);
      setStatus("");
      await api.post("/api/send-mails", formData);
      setStatus("✅ Emails sent successfully!");
      reset(); // ✅ resets form cleanly
    } catch {
      setStatus("❌ Failed to send emails");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardLayout title="AutoMailer Dashboard">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <SubjectInput register={register} />
        <EmailsInput register={register} />
        <TemplateInput register={register} />
        <ResumeInput register={register} />
        <SubmitButton loading={loading} />
        {status && <p className="text-center">{status}</p>}
      </form>
    </CardLayout>
  );
}
