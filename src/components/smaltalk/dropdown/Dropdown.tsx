import { useRef, useState, useEffect } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { DropdownWrapper, StyledButton, StyledMenu, StyledItem, DropdownArrow } from "@/components/smaltalk/dropdown/Dropdown.Styled";
import { DropdownProps } from "@/types/dropdown";

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, selected, onToggle }) => {

  
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      menuRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isOpen]);

  return (
    <DropdownWrapper size="default">
      <Menu>
        <MenuButton size="default"
          as={StyledButton}
          onClick={() => {
            setIsOpen((prev) => !prev);
            onToggle && onToggle(!isOpen);
          }}
        >
          {selected}
          <DropdownArrow src="/Icons/dropdownTriangle.svg" alt="dropdown arrow" />
        </MenuButton>
        {isOpen && (
          <MenuItems as={StyledMenu} ref={menuRef}>
            {options.map((option, index) => (
              <MenuItem key={option.subjectId} as="div">
                <StyledItem
                onClick={() => {
                  onSelect(option.subjectName); 
                  setIsOpen(false);
                  onToggle && onToggle(false);
                }}
                  $isFirst={index === 0}
                  $isLast={index === options.length - 1}
                >
                  {option.subjectName}
                </StyledItem>
              </MenuItem>
            ))}
          </MenuItems>
        )}
      </Menu>
    </DropdownWrapper>
  );
};

export default Dropdown;
