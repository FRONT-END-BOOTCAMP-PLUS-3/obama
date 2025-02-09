import { useRef, useState, useEffect } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { DropdownWrapper, StyledButton, StyledMenu, StyledItem, DropdownArrow } from "@/components/smaltalk/dropdown/Dropdown.Styled";

const AdminDropdown: React.FC<{ options: string[]; onSelect: (option: string) => void; selected: string; size?: "default" | "small" }> = ({ options, onSelect, selected, size = "default" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSelection, setCurrentSelection] = useState(selected); 

  const menuRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      menuRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isOpen]);

  const handleSelect = (option: string) => {
    setCurrentSelection(option); 
    onSelect(option); 
    setIsOpen(false); 
  };

  return (
    <DropdownWrapper size= "small">
      <Menu>
        <MenuButton as={StyledButton} size="small" onClick={() => setIsOpen((prev) => !prev)}>
          {currentSelection} 
          <DropdownArrow src="/Icons/dropdownTriangle.svg" alt="dropdown arrow" />
        </MenuButton>
        {isOpen && (
          <MenuItems as={StyledMenu} ref={menuRef}>
            {options.map((option) => (
              <MenuItem key={option} as="div">
                <StyledItem onClick={() => handleSelect(option)}>
                  {option}
                </StyledItem>
              </MenuItem>
            ))}
          </MenuItems>
        )}
      </Menu>
    </DropdownWrapper>
  );
};

export default AdminDropdown;
