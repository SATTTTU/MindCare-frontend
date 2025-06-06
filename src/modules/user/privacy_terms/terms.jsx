import { Box, Typography, Container } from "@mui/material";

export const TermsOfService = () => (
  <Container sx={{ py: 6 }}>
    <Typography variant="h4" color="#0e9300" fontWeight="bold" gutterBottom>
      Terms of Service
    </Typography>

    <Typography paragraph>
      These Terms of Service ("Terms") govern your use of MindCare. By creating an account or using our services, you agree to be bound by these Terms.
    </Typography>

    <Typography variant="h6" fontWeight="bold" mt={4}>
      1. Use of Service
    </Typography>
    <Typography paragraph>
      MindCare is intended for personal mental health journaling and emotional tracking. You agree not to use the service for any illegal, abusive, or unauthorized purposes.
    </Typography>

    <Typography variant="h6" fontWeight="bold" mt={4}>
      2. User Responsibilities
    </Typography>
    <Typography paragraph>
      You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account.
    </Typography>

    <Typography variant="h6" fontWeight="bold" mt={4}>
      3. Content Ownership
    </Typography>
    <Typography paragraph>
      You retain full ownership of your journal content. We do not access, share, or analyze your private entries without your explicit permission.
    </Typography>

    <Typography variant="h6" fontWeight="bold" mt={4}>
      4. Account Termination
    </Typography>
    <Typography paragraph>
      You may delete your account at any time. We reserve the right to suspend or terminate accounts that violate these Terms or engage in harmful behavior.
    </Typography>

    <Typography variant="h6" fontWeight="bold" mt={4}>
      5. Limitation of Liability
    </Typography>
    <Typography paragraph>
      MindCare is not a substitute for professional medical advice or treatment. We are not liable for any decisions made based on the use of our platform.
    </Typography>

    <Typography variant="h6" fontWeight="bold" mt={4}>
      6. Changes to Terms
    </Typography>
    <Typography paragraph>
      We may revise these Terms periodically. Continued use after changes implies acceptance.
    </Typography>

    <Typography variant="h6" fontWeight="bold" mt={4}>
      7. Contact
    </Typography>
    <Typography paragraph>
      Questions? Contact us at legal@mindcare.com.
    </Typography>
  </Container>
);
