import * as React from "react";

import {MessageBoxContext} from "contexts";
import MessageBox, {MessageBoxProps} from "components/MessageBox";

const useMsg = () => {
  const [_, setMsgBox] = React.useContext(MessageBoxContext);

  return (args: MessageBoxProps) => {
    setMsgBox(
      <MessageBox
        kind={args.kind}
        msg={args.msg}
        confirmed={args.confirmed}
        approveText={args.approveText}
        rejectText={args.rejectText}
        blocking={args.blocking}
        callback={(response) => {
          setMsgBox(null);
          args.callback?.(response);
        }}
      />
    );
  };
}

export default useMsg;
