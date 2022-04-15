import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function Header(): JSX.Element {
  return (
    <Container
      maxWidth="sm"
      component="header"
      sx={{ pt: 7, pb: 6, backgroundColor: "primary.dark" }}
      disableGutters
    >
      <Typography
        variant="h2"
        component="h1"
        align="center"
        color="text.primary"
        gutterBottom
      >
        What do you need to do this week?
      </Typography>
    </Container>
  );
}
