import {
  AppBar,
  Box,
  Container,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import { useRouter } from "next/router";
import { useCallback } from "react";

export const Message = () => {
  const router = useRouter();

  const handleOnBackClick = useCallback(() => {
    router.replace({ pathname: "/" });
  }, [router]);
  return (
    <Container disableGutters maxWidth={false}>
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar>
          <IconButton color="inherit" onClick={handleOnBackClick}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {`[Name]`}
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper></Paper>
      <AppBar
        position="fixed"
        color="default"
        sx={{
          top: "auto",
          bottom: 0,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <TextField sx={{ flexGrow: 1, border: "none" }} />
        <IconButton color="inherit">
          <SendIcon />
        </IconButton>
      </AppBar>
    </Container>
  );
};
