export interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
}

export interface StyledItemProps {
  $isFirst?: boolean;
  $isLast?: boolean;
}
