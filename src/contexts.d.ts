import * as React from "react";
export type MessageBoxContextType = React.ReactElement | null;
export declare const MessageBoxContext: React.Context<[MessageBoxContextType, React.Dispatch<React.SetStateAction<MessageBoxContextType>>]>;
