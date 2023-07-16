"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import AppWrapper from "./AppWrapper";
import { Provider } from "react-redux";
import { store, persistor } from "@/store";
import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistGate } from "redux-persist/integration/react";

import AsyncStorage from '@react-native-async-storage/async-storage'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      cacheTime: 1000 * 60 * 60, // 1 hour
      staleTime: 1000 * 60 * 10 // 10 minutes
    },
  },
})

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage
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
          <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: asyncStoragePersister }}>
            <AppWrapper>
              {children}
            </AppWrapper>
            <ReactQueryDevtools initialIsOpen={false} />
          </PersistQueryClientProvider>
        </PersistGate>
      </Provider>
      </body>
    </html>
  );
}
