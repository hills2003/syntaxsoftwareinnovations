
import { Inter } from "next/font/google";
import "./globals.css";
import AuthContext from "./AuthContext";
import Wrapper from "./Wrapper";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
   
    <AuthContext>
      <html lang="en">
        <Wrapper>
        <body className={inter.className}>{children}</body>
        </Wrapper>
      </html>
    </AuthContext>
   
  );
}
