import { SearchProvider } from "@/context/SearchContext";

export const SearchContextProvider = ({ children }) => {
  return <SearchProvider>{children}</SearchProvider>;
};
