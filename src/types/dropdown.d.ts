export interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  selected?: string | null;
  onToggle: (isOpen : boolean) => void;
}

export interface StyledItemProps {
  $isFirst?: boolean;
  $isLast?: boolean;
}
