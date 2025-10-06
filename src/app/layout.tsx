import type { Metadata } from "next";
import "./globals.css";
import GovUkInit from "../components/GovUkInit";

export const metadata: Metadata = {
  title: "GOV.UK Hello World",
  description: "Hello World example using GOV.UK Frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="govuk-template">
      <head>
        <link rel="stylesheet" href="/assets/styles/govuk-frontend.min.css" />
      </head>
      <body className="govuk-template__body">
        <GovUkInit />
        {children}
      </body>
    </html>
  );
}
