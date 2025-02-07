export interface SelectedItem {
    useritem_id: string; // 고유 ID
    item_id: string;  // 선택한 아이템 ID (item 테이블 참조)
    user_id: string; // 사용자 ID (고유 식별자)
  }
  