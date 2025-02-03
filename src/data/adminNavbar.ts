export const adminNavbarItems = [
  { label: "사용자 관리", path: "/admin/user" },
  {
    label: "스몰토크 DB 관리",
    children: [
      { label: "밸런스게임", path: "/admin/smalltalk/balanceGames" },
      { label: "추천 주제", path: "/admin/smalltalk/topics" }
    ]
  }
];
