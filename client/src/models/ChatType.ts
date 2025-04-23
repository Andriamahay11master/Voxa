import { MessageType } from "./MessageType";
export type ChatType = {
  id: string;
  nameContact: string;
  pictureContact: string;
  messages: MessageType[];
  lastMessage: string;
  lastMessageDate: Date;
  createdAt: Date;
};
