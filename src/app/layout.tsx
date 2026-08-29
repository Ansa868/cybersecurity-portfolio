import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ansa Shahid — Cybersecurity Professional & AI Security Researcher",
  description:
    "Portfolio of Ansa Shahid, a Cybersecurity Professional specializing in AI Security, LLM guardrails, prompt injection defense, and advanced penetration testing.",
  keywords: [
    "cybersecurity",
    "AI security",
    "penetration testing",
    "LLM security",
    "SAST",
    "AI governance",
    "Ansa Shahid",
  ],
  authors: [{ name: "Ansa Shahid" }],
  openGraph: {
    title: "Ansa Shahid — Cybersecurity & AI Security",
    description:
      "Securing the future of Artificial Intelligence. Specializing in LLM guardrails, prompt injection, and SAST.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a0f] text-[#f0f0ff] antialiased overflow-x-hidden scanline">
        {children}
      </body>
    </html>
  );
}
