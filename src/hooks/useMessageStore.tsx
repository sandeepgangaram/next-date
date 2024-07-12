import { create } from "zustand";
import { MessageDto } from "../types";
import { devtools } from "zustand/middleware";

interface MessageStore {
  messages: MessageDto[];
  add: (message: MessageDto) => void;
  remove: (id: string) => void;
  set: (messages: MessageDto[]) => void;
}

const useMessageStore = create<MessageStore>()(
  devtools(
    (set) => ({
      messages: [],
      add: (message) =>
        set((state) => ({ messages: [message, ...state.messages] })),
      remove: (id) =>
        set((state) => ({
          messages: state.messages.filter((message) => message.id !== id),
        })),
      set: (messagesArg) => set(() => ({ messages: messagesArg })),
    }),
    { name: "messageStore" }
  )
);

export default useMessageStore;
