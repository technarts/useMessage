import * as React from "react";
import { createPortal } from "react-dom";
import { SvgIcon } from "@mui/material";


type MessagerPropsBase = {
  icon: typeof SvgIcon;
  iconColor?: string;
  caption: string;
  message: string;
};

type MessagerPropsPrompt = {
  okButton: React.ReactElement;
  yesNoButton?: never;
};

type MessagerPropsConfirmed = {
  okButton?: never;
  yesNoButton: React.ReactElement;
}

export type MessagerProps = MessagerPropsBase & (MessagerPropsPrompt | MessagerPropsConfirmed);

const root = document.getElementById("messager");

const Messager = (props: MessagerProps) => {
  const elRef: React.MutableRefObject<HTMLDivElement | null> = React.useRef(null);
  const Icon = props.icon;

  if (!elRef.current)
    elRef.current = document.createElement("div");

  React.useEffect(() => {
    if (!root || !elRef.current)
      return;

    root.appendChild(elRef.current);

    return () => {
      if (elRef.current)
        root.removeChild(elRef.current);
    };
  }, []);

  return createPortal(
    <div
      className="messager--container"
      style={{
        backgroundColor: "#30300040",
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: 3000, // todo theme.layers.messager
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{
        backgroundColor: "white",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "space-between",
        flexDirection: "column",
        width: "450px",
        height: "210px",
        minHeight: "210px",
        maxHeight: "210px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          padding: "15px",
          height: "calc(100% - 40px)",
        }}>
          <Icon sx={{
            width: 150,
            height: 150,
            ...(props.iconColor && { color: props.iconColor })
          }}/>
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "80%",
            width: "270px",
          }}>
            <h1 style={{ padding: 0, margin: 0 }}>{props.caption}</h1>
            <p style={{
              fontSize: "16px",
              height: "100%",
              width: "100%",
              overflow: "auto",
            }}>
              {props.message}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", height: "40px", padding: "5px" }}>
          {props.okButton || props.yesNoButton}
        </div>

      </div>
    </div>,
    elRef?.current);
};

export default Messager;

