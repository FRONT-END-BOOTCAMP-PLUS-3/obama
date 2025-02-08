import React from "react";
import { SearchBarWrapper, SearchButton, DropdownContainer } from "./Searchbar.Styled";
import AdminDropdown from "@/components/admin/dropdown/Dropdown";
import { TextField } from "@/components/common/textField";


interface SearchBarProps {
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder }) => {
  return (
    <SearchBarWrapper>
      <DropdownContainer>
        <AdminDropdown options={["가나다라", "마바사아자", "차카타파하"]} 
        onSelect={(option) => console.log(option)} 
        selected="가나다라"  />
      </DropdownContainer>
      <TextField name="search" placeholder={placeholder} size="XL" />
      <SearchButton size="s" variant="contained">검색</SearchButton>
    </SearchBarWrapper>
  );
};

export default SearchBar;
