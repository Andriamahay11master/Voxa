import { MainUserType } from "./MainUserType";
import { MessageType } from "./MessageType";
export type ChatType = {
  id: string;
  participants: string[];
  usersInfo: MainUserType;
  messages: MessageType[];
  lastMessage: string;
  lastMessageDate: Date;
  createdAt: Date;
};
