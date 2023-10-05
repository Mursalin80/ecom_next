import "./globals.css";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer } from "react-toastify";
import CartContext from "@/context/cartContext";
import { Suspense } from "react";

import AuthProvider from "@/components/Provider";
import Navbar from "@/components/nav/Navbar";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import Error from "@/components/error/Error";
import LoadingDots from "@/components/util/loading-dots";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary fallback={<Error />}>
          <AuthProvider>
            <Suspense fallback={<LoadingDots />}>
              <CartContext>
                <Navbar />
                {children}
              </CartContext>
            </Suspense>
          </AuthProvider>
        </ErrorBoundary>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Slide}
        />
      </body>
    </html>
  );
}
