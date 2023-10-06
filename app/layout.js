import "./globals.css";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer } from "react-toastify";
import { Suspense } from "react";

import CartContext from "@/context/cartContext";
import AuthProvider from "@/components/Provider";
import Navbar from "@/components/nav/Navbar";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import Error from "@/components/error/Error";
import Loading from "@/components/util/table-placeholder";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary fallback={<Error />}>
          <AuthProvider>
            <Suspense fallback={<Loading />}>
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
