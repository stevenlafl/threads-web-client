"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import AppWrapper from "./AppWrapper";
import { Provider } from "react-redux";
import { store, persistor } from "@/store";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistGate } from "redux-persist/integration/react";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
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
          <QueryClientProvider client={queryClient}>
            <AppWrapper>
              {children}
            </AppWrapper>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
      </body>
    </html>
  );
}
