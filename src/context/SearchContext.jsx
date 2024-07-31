"use client";
import { createContext } from "react";
export const SearchContext = createContext();
import { useState } from "react";
import { useRouter } from "next/navigation";

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      router.push(`/products?search=${searchQuery}`);
    }
  };

  return (
    <SearchContext.Provider value={{ handleSearch, handleChange }}>
      {children}
    </SearchContext.Provider>
  );
};
