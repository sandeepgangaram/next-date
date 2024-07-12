import { truncateString } from "@/src/actions/util";
import PresenceAvatar from "@/src/components/PresenceAvatar";
import { MessageDto } from "@/src/types";
import { Button } from "@nextui-org/react";
import React from "react";
import { AiFillDelete } from "react-icons/ai";

interface Props {
  item: MessageDto;
  columnKey: string;
  isOutBox: boolean;
  isDeleting: boolean;
  deleteMessage: (message: MessageDto) => void;
}
const MessageTableCell = ({
  item,
  columnKey,
  isOutBox,
  isDeleting,
  deleteMessage,
}: Props) => {
  const cellValue = item[columnKey as keyof MessageDto];

  switch (columnKey) {
    case "recipientName":
    case "senderName":
      return (
        <div className="flex items-center gap-2 cursor-pointer">
          <PresenceAvatar
            userId={isOutBox ? item.recipientId : item.senderId}
            src={isOutBox ? item.recipientImage : item.senderImage}
          />
        </div>
      );
    case "text":
      return <div className="truncate">{truncateString(cellValue, 70)}</div>;
    case "created":
      return cellValue;
    default:
      return (
        <Button
          isIconOnly
          variant="light"
          onClick={() => deleteMessage(item)}
          isLoading={isDeleting}
        >
          <AiFillDelete size={24} className="text-danger" />
        </Button>
      );
  }
};

export default MessageTableCell;
