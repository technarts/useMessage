import * as React from "react";

export type MessageBoxContextType = React.ReactElement | null;

export const MessageBoxContext = React.createContext([
  null,
  (state: MessageBoxContextType): MessageBoxContextType => state
] as [
  MessageBoxContextType,
  React.Dispatch<React.SetStateAction<MessageBoxContextType>>
]);