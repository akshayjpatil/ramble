import { List } from "@mui/material";
import { Contact } from "../../../types/main.types";
import { ContactItem, ContactItemProps } from "../../molecules/ContactItem";

export type ContactListProps = {
  contacts: Contact[];
};

export const ContactList = ({ contacts }: ContactListProps) => {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }} disablePadding>
      {contacts.map((contact: Contact, index: number) => (
        <ContactItem key={index} {...(contact as ContactItemProps)} />
      ))}
    </List>
  );
};
