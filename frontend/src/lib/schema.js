import { z } from "zod";

export const mailSchema = z.object({
  subject: z.string().min(5),
  emails: z.string().min(5),
  template: z.string().min(20),
  resume: z.any(),
});
