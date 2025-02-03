import { useState } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import {
  DropdownWrapper,
  StyledButton,
  StyledMenu,
  StyledItem,
  DropdownArrow
} from "@/components/common/Dropdown/Dropdown.Styled";
import { DropdownProps } from "@/types/dropdown";


const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {

  const [selected, setSelected] = useState<string>(options[0]);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
  };

  return (
    <DropdownWrapper>
      <Menu>
        <MenuButton as={StyledButton}>
          {selected}
          <DropdownArrow src="/Icons/dropdownTriangle.svg" alt="dropdown arrow" />
        </MenuButton>
        <MenuItems as={StyledMenu}>
          {options.map((option, index) => (
            <MenuItem key={option} as="div">
              <StyledItem
                onClick={() => handleSelect(option)}
                $isFirst={index === 0}
                $isLast={index === options.length - 1}
              >
                {option}
              </StyledItem>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </DropdownWrapper>
  );
};

export default Dropdown;
