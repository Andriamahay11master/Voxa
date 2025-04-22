import { MessageType } from "./MessageType";
export type ChatType = {
  id: string;
  userUid: string;
  nameContact: string;
  pictureContact: string;
  messages: MessageType[];
  lastMessage: string;
  lastMessageDate: string;
};
