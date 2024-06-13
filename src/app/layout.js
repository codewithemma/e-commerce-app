import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextTopLoader from "nextjs-toploader";
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
        url: "/assets/logo-white.png",
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
    image: "/assets/logo-white.png",
  },
  additionalMetaTags: [
    {
      property: "description",
      content:
        "Discover over 1 million products at Exclusive E-commerce App, your ultimate destination for a diverse assortment of categories including consumer electronics, fashion, home goods, and more. Shop now and enjoy a seamless shopping experience with fast growth and excellent service.",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/assets/logo-white.png",
    },
  ],
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
        <NextTopLoader />
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
