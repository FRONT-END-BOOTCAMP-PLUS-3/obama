import { toSnakeCase, toCamelCase } from "@/utils/convertCase";

interface User {
    userId: string;
    userName: string;
    birthDate: string;
    addressInfo: {
        streetName: string;
        zipCode: string;
    };
    items: Array<{ itemId: string; itemName: string }>;
}

describe("convertCase utility", () => {
    const sampleData: User = {
        userId: "123",
        userName: "John Doe",
        birthDate: "2000-01-01",
        addressInfo: {
            streetName: "Main St",
            zipCode: "12345",
        },
        items: [
            { itemId: "abc", itemName: "Item A" },
            { itemId: "def", itemName: "Item B" }
        ]
    };

    it("✅ camelCase → snake_case 변환", () => {
        const result = toSnakeCase(sampleData);
        console.log("🔹 camelCase → snake_case 변환 결과:", JSON.stringify(result, null, 2));

        const expected = {
            user_id: "123",
            user_name: "John Doe",
            birth_date: "2000-01-01",
            address_info: {
                street_name: "Main St",
                zip_code: "12345",
            },
            items: [
                { item_id: "abc", item_name: "Item A" },
                { item_id: "def", item_name: "Item B" }
            ]
        };
        expect(result).toEqual(expected);
    });

    it("✅ snake_case → camelCase 변환", () => {
        const snakeData = {
            user_id: "123",
            user_name: "John Doe",
            birth_date: "2000-01-01",
            address_info: {
                street_name: "Main St",
                zip_code: "12345",
            },
            items: [
                { item_id: "abc", item_name: "Item A" },
                { item_id: "def", item_name: "Item B" }
            ]
        };
        const result = toCamelCase(snakeData);
        console.log("🔹 snake_case → camelCase 변환 결과:", JSON.stringify(result, null, 2));

        expect(result).toEqual(sampleData);
    });

    it("✅ 배열 내 객체 변환", () => {
        const snakeArray = [
            { item_id: "abc", item_name: "Item A" },
            { item_id: "def", item_name: "Item B" }
        ];
        const result = toCamelCase(snakeArray);
        const camelArray = [
            { itemId: "abc", itemName: "Item A" },
            { itemId: "def", itemName: "Item B" }
        ];
        expect(result).toEqual(camelArray);
    });


});