"use client";
import { MessageDto } from "@/src/types";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import MessageTableCell from "./MessageTableCell";
import { useMessages } from "@/src/hooks/useMessages";

interface Props {
  initialMessages: MessageDto[];
}
const MessageTable = ({ initialMessages }: Props) => {
  const { isOutBox, isDeleting, columns, messages, selectRow, deleteMessage } =
    useMessages(initialMessages);
  return (
    <Card className="flex flex-col gap-3 h-[80vh] overflow-auto">
      <Table
        aria-label="Table with messages"
        selectionMode="single"
        onRowAction={(key) => selectRow(key)}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              width={column.key === "text" ? "50%" : undefined}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={messages}
          emptyContent="No messages for this container"
        >
          {(item) => (
            <TableRow key={item.id} className="cursor-pointer">
              {(columnKey) => (
                <TableCell
                  className={`${
                    !item.dateRead && !isOutBox ? "font-semibold" : ""
                  }`}
                >
                  <MessageTableCell
                    item={item}
                    columnKey={columnKey as string}
                    isOutBox={isOutBox}
                    isDeleting={isDeleting.id === item.id && isDeleting.loading}
                    deleteMessage={deleteMessage}
                  />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default MessageTable;
