import * as React from "react";
import { ContactList } from "../../organisms/ContactList";
import { Contact } from "../../../types/main.types";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import NewMessageIcon from "@mui/icons-material/AddComment";
import { useRouter } from "next/router";

export const Home = () => {
  const dummyContacts: Contact[] = [
    { name: "Aisha", phone: "981-123-1231", truncatedLastMessage: "Hi!" },
    { name: "Champa", phone: "981-123-1231", truncatedLastMessage: "Hola!" },
  ];
  return (
    <Container disableGutters>
      <Box flexGrow={1}>
        <AppBar position="static" sx={{ mb: 2 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {`Messages`}
            </Typography>
            <IconButton color="inherit">
              <NewMessageIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <ContactList contacts={dummyContacts} />
    </Container>
  );
};
