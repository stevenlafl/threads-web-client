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
import { store, persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  console.log('loaded');
  return (
    <html lang="en">
      <head>
        <title>Threads, an Instagram app Web Client</title>
        <meta name="description" content="A Next.JS desktop web client for Meta's Instagram Threads" />
      </head>
      <body
        className={
          inter.className + " flex items-center justify-center bg-[#101010] max-w-screen-xl w-screen m-auto"
        }
      >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppWrapper>
            {children}
          </AppWrapper>
        </PersistGate>
      </Provider>
      </body>
    </html>
  );
}
