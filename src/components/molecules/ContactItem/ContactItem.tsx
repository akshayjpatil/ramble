import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { Contact } from "../../../types/main.types";

export type ContactItemProps = Contact;

const stringToColor = (string: string) => {
  let hash = 0;
  let i;
  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
};

const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split("")[0]}`,
  };
};

export const ContactItem = ({
  name,
  truncatedLastMessage: lastMessage,
}: ContactItemProps) => {
  const router = useRouter();

  const handleOnContactClick = useCallback(() => {
    router.replace({ pathname: "/message" });
  }, [router]);

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleOnContactClick}>
        <ListItemAvatar>
          <Avatar {...stringAvatar(name)} />
        </ListItemAvatar>
        <ListItemText primary={name} secondary={lastMessage} />
      </ListItemButton>
    </ListItem>
  );
};
