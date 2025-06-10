import { Resend } from "resend";

type SendEmailProps = {
  to: string;
  subject: string;
  text: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, text }: SendEmailProps) {
  await resend.emails.send({
    from: "Doutor Agenda <onboarding@resend.dev>", // Use o domínio padrão do Resend ou configure o seu
    to,
    subject,
    text,
  });
}