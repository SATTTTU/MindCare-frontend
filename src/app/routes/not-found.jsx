import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Stack,
  SvgIcon,
  Link,
} from "@mui/material";
import { ReactComponent as NotFoundIcon } from "./NotFoundIcon.svg"; // Optional SVG import

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box
      minHeight="100vh"
      bgcolor="grey.50"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
          <SvgIcon sx={{ fontSize: 80, color: "grey.400", mb: 2 }}>
            {/* fallback icon if not using SVG import */}
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 
                     0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 
                     10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z" />
          </SvgIcon>

          <Typography variant="h4" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" color="textSecondary" mb={4}>
            We couldn't find the page you're looking for. 
          </Typography>

          <Stack spacing={2}>
            <Button variant="contained" color="primary" onClick={handleGoHome} fullWidth>
              Return to Dashboard
            </Button>
            <Button variant="outlined" onClick={() => navigate(-1)} fullWidth>
              Go Back
            </Button>
          </Stack>
        </Paper>

        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            Need assistance?{" "}
            <Link href="/support" color="primary" underline="hover">
              Contact Support
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
