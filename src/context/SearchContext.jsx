"use client";
import { createContext } from "react";
export const SearchContext = createContext();
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const searchParams = useSearchParams();

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      setShowResult(false);
      return;
    }
    searchParams.getAll("search", searchQuery);
    try {
      const res = await fetch(`/api/user/products?search=${searchQuery}`);
      const resData = await res.json();
      console.log(resData);

      if (!res.ok) {
        return null;
      } else {
        setSearchResults(resData);
        setShowResult(true);
      }
    } catch (error) {
      return null;
    }
  };
  return (
    <SearchContext.Provider value={{ searchResults, showResult, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
