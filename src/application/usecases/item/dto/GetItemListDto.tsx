export interface GetItemListDto {
  offset?: number;
  limit?: number;
  items?: any[]; // 응답 데이터를 포함할 수도 있음
}
