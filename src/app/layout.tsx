"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import PostForm from "./PostForm";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import AppWrapper from "./AppWrapper";
import { Provider } from "react-redux";
import { makeStore } from "@/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body
        className={
          inter.className + "flex items-center justify-center bg-[#101010]"
        }
      >
      <Provider store={makeStore()}>
        <AppWrapper>
          {children}
        </AppWrapper>
      </Provider>
      </body>
    </html>
  );
}
