import "../styles/globals.css";

export const metadata = {
  title: "Factori Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
