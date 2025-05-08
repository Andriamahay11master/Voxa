import { MessageType } from "./MessageType";
export type ChatType = {
  id: string;
  participants: string[];
  messages: MessageType[];
  lastMessage: string;
  lastMessageDate: Date;
  createdAt: Date;
};
