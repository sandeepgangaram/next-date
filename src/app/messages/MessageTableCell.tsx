import { truncateString } from "@/src/actions/util";
import AppModal from "@/src/components/AppModal";
import PresenceAvatar from "@/src/components/PresenceAvatar";
import { MessageDto } from "@/src/types";
import { Button, ButtonProps, useDisclosure } from "@nextui-org/react";
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onConfirmationDeleteMessage = () => {
    deleteMessage(item);
  };

  const footerButtons: ButtonProps[] = [
    { color: "default", onClick: onClose, children: "Cancel" },
    {
      color: "secondary",
      onClick: onConfirmationDeleteMessage,
      children: "Confirm",
    },
  ];

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
      return <div>{cellValue}</div>;
    default:
      return (
        <>
          <Button
            isIconOnly
            variant="light"
            onClick={() => onOpen()}
            isLoading={isDeleting}
          >
            <AiFillDelete size={24} className="text-danger" />
          </Button>
          <AppModal
            isOpen={isOpen}
            onClose={onClose}
            header="Please confirm"
            body={
              <div>
                Are you sure you want to delete this message? This action cannot
                be undone.
              </div>
            }
            footerButtons={footerButtons}
          />
        </>
      );
  }
};

export default MessageTableCell;
