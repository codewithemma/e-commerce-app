import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "500", "700"],
});
export const metadata = {
  title: "Exclusive - Your One-Stop Shop for Over 1 Million Products",
  description:
    "Discover over 1 million products at Exclusive, your ultimate destination for a diverse assortment of categories including consumer electronics, fashion, home goods, and more. Shop now and enjoy a seamless shopping experience with fast growth and excellent service.",
  openGraph: {
    title: "Exclusive - Your One-Stop Shop for Over 1 Million Products",
    description:
      "Discover over 1 million products at Exclusive, your ultimate destination for a diverse assortment of categories including consumer electronics, fashion, home goods, and more. Shop now and enjoy a seamless shopping experience with fast growth and excellent service.",
    url: "https://exclusivee-commerce-app.vercel.app",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/25036898/pexels-photo-25036898/free-photo-of-holding-bubble-waffle-ice-cream-with-toppings.jpeg?auto=compress&cs=tinysrgb&w=600",
        width: 1200,
        height: 630,
        alt: "Exclusive - Your One-Stop Shop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exclusive - Your One-Stop Shop for Over 1 Million Products",
    description:
      "Discover over 1 million products at Exclusive, your ultimate destination for a diverse assortment of categories including consumer electronics, fashion, home goods, and more. Shop now and enjoy a seamless shopping experience with fast growth and excellent service.",
    image:
      "https://images.pexels.com/photos/25036898/pexels-photo-25036898/free-photo-of-holding-bubble-waffle-ice-cream-with-toppings.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Exclusive",
    url: "https://exclusivee-commerce-app.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://exclusivee-commerce-app.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    description:
      "Discover over 1 million products at Exclusive, your ultimate destination for a diverse assortment of categories including consumer electronics, fashion, home goods, and more. Shop now and enjoy a seamless shopping experience with fast growth and excellent service.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <Navbar />
                {children}
                <ToastContainer
                  position="bottom-center"
                  autoClose={5000}
                  hideProgressBar={true}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  draggable
                />
                <Footer />
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
