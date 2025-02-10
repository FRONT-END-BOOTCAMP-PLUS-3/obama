import React from "react";
import {
  Table,
  TableWrapper,
  UserCell,
  UserHeader,
} from "@/components/admin/table/Table.Style";

interface TableColumn<T> {
  header: string;
  key: keyof T | "edit" | "delete"; 
  render?: (value: any, row: T) => React.ReactNode;
}

interface ReusableTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
}

const AdminTable = <T,>({ data, columns }: ReusableTableProps<T>) => {
  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <UserHeader key={index}>{column.header}</UserHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <UserCell key={colIndex}>
                  {column.render
                    ? column.render(row[column.key as keyof T], row)
                    : String(row[column.key as keyof T] ?? "N/A")}
                </UserCell>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

export default AdminTable;
