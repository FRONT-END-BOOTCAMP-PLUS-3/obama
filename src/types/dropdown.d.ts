import { SmalltalkSubjectDto } from "@/application/common/usecases/smalltalkSubject/dto/SmalltalkSubjectDto";

export interface DropdownProps {
  options: SmalltalkSubjectDto[];
  onSelect: (option: string) => void;
  selected?: string | null;
  onToggle: (isOpen : boolean) => void;
}

export interface StyledItemProps {
  $isFirst?: boolean;
  $isLast?: boolean;
}
