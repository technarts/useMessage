import * as React from "react";
import { useTheme } from "@mui/material/styles";
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import {PlaneButton} from "@technarts/planebutton";
import Messager, { MessagerProps } from "./Messager";

export type MessageBoxProps = {
  kind: null | "warning" | "info" | "success" | "error",
  msg: string,
  confirmed?: boolean,
  approveText?: string,
  rejectText?: string,
  callback?: (response: "approved" | "rejected") => void,
  blocking?: boolean
}

const MessageBox = (props: MessageBoxProps) => {
  const theme = useTheme();

  let icon: MessagerProps["icon"] = CancelIcon;
  let iconColor: MessagerProps["iconColor"] = theme.palette.error.dark;
  let caption: MessagerProps["caption"] = "Hata";
  let colors = {
    primary: ["white", theme.palette.error.dark],
    secondary: ["white", theme.palette.error.dark + "d8"]
  }

  switch(props.kind) {
    case "warning":
      icon = WarningIcon;
      iconColor = theme.palette.warning.dark;
      caption = "Uyarı";
      colors = {
        primary: ["white", theme.palette.warning.dark],
        secondary: ["white", theme.palette.warning.dark + "d8"]
      }
      break;

    case "info":
      icon = InfoIcon;
      iconColor = theme.palette.info.dark;
      caption = "Bilgi";
      colors = {
        primary: ["white", theme.palette.info.dark],
        secondary: ["white", theme.palette.info.dark + "d8"]
      }
      break;

    case "success":
      icon = CheckCircleIcon;
      iconColor = theme.palette.success.dark;
      caption = "İşlem Başarılı";
      colors = {
        primary: ["white", theme.palette.success.dark],
        secondary: ["white", theme.palette.success.dark + "d8"]
      }
      break;

    case "error":
      icon = CancelIcon;
      iconColor = theme.palette.error.dark;
      caption = "Hata";
      colors = {
        primary: ["white", theme.palette.error.dark],
        secondary: ["white", theme.palette.error.dark + "d8"]
      }
      break;
  }

  return (
    <Messager
      icon={icon}
      iconColor={iconColor}
      caption={caption}
      message={props.msg}
      {...(
        !props.confirmed
          ? (
            {okButton:
                <PlaneButton
                  loading={props.blocking || false}
                  text={props.approveText || "Tamam"}
                  onClick={() => props.callback?.("approved")}
                  hover={colors.primary[1] + "d8"}
                  style={{
                    color: colors.primary[0],
                    backgroundColor: colors.primary[1],
                  }}
                />}
          ) : (
            {yesNoButton: (
                <div style={{ display: "flex", width: "100%" }}>
                  <div style={{ flex: 1, paddingRight: "3px" }}>
                    <PlaneButton
                      text={props.approveText || "Tamam"}
                      onClick={() => props.callback?.("approved")}
                      hover={colors.primary[1] + "d8"}
                      style={{
                        color: colors.primary[0],
                        backgroundColor: colors.primary[1],
                        height: "100%",
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, paddingLeft: "3px" }}>
                    <PlaneButton
                      text={props.rejectText || "İptal"}
                      onClick={() => props.callback?.("rejected")}
                      style={{
                        color: colors.secondary[0],
                        backgroundColor: colors.secondary[1],
                        height: "100%",
                      }}
                    />
                  </div>
                </div>
              )}
          )
      )}
    />
  );
};

export default MessageBox;

