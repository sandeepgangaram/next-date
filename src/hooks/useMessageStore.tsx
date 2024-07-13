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
  resetMessages: () => void;
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
      set: (messages) =>
        set((state) => {
          const map = new Map(
            [...state.messages, ...messages].map((m) => [m.id, m])
          );
          const uniqueMessages = Array.from(map.values());
          return { messages: uniqueMessages };
        }),
      updateUnreadCount: (amount) =>
        set((state) => ({ unreadCount: state.unreadCount + amount })),
      resetMessages: () => set(() => ({ messages: [] })),
    }),
    { name: "messageStore" }
  )
);

export default useMessageStore;
