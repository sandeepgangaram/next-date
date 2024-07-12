import { create } from "zustand";
import { MessageDto } from "../types";
import { devtools } from "zustand/middleware";

interface MessageStore {
  messages: MessageDto[];
  unreadCount: number;
  add: (message: MessageDto) => void;
  remove: (id: string) => void;
  set: (messages: MessageDto[]) => void;
  updateUnreadCount: (amount: number) => void;
}

const useMessageStore = create<MessageStore>()(
  devtools(
    (set) => ({
      messages: [],
      unreadCount: 0,
      add: (message) =>
        set((state) => ({ messages: [message, ...state.messages] })),
      remove: (id) =>
        set((state) => ({
          messages: state.messages.filter((message) => message.id !== id),
        })),
      set: (messagesArg) => set(() => ({ messages: messagesArg })),
      updateUnreadCount: (amount) =>
        set((state) => ({ unreadCount: state.unreadCount + amount })),
    }),
    { name: "messageStore" }
  )
);

export default useMessageStore;
