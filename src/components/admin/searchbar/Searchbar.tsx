import React, { useState } from "react";
import { SearchBarWrapper, SearchButton, DropdownContainer } from "./Searchbar.Styled";
import AdminDropdown from "@/components/admin/dropdown/Dropdown";
import { TextField } from "@/components/common/textField";

interface SearchBarProps {
  placeholder: string;
  onSearch: (searchType: string, query: string) => void;
  options: string[]; // 드롭다운 옵션을 props로 전달
  defaultOption?: string; // 기본 선택 옵션 (선택 사항)
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch, options, defaultOption }) => {
  const [searchType, setSearchType] = useState<string>(defaultOption || options[0]); // 기본값 설정
  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    onSearch(searchType, query);
  };

  return (
    <SearchBarWrapper>
      <DropdownContainer>
        <AdminDropdown 
          options={options} 
          onSelect={(option: string) => setSearchType(option)} // ✅ 수정된 부분
          selected={searchType}  
        />
      </DropdownContainer>
      <TextField 
        name="search" 
        placeholder={placeholder} 
        size="XL" 
        value={query} 
        onChange={(name, value) => setQuery(value)} // ✅ `name`, `value` 받도록 수정
      />
      <SearchButton size="s" variant="contained" onClick={handleSearch}>
        검색
      </SearchButton>
    </SearchBarWrapper>
  );
};

export default SearchBar;
