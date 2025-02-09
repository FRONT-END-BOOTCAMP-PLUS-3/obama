export interface SelectedItem {
    useritemId: string; // 고유 ID
    itemId: string;  // 선택한 아이템 ID (item 테이블 참조)
    userId: string; // 사용자 ID (고유 식별자)
  }
  