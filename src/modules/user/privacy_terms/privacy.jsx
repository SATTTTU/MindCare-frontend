import { Box, Typography, Container } from "@mui/material";

export const PrivacyPolicy = () => (
  <Container sx={{ py: 6 }}>
    <Typography variant="h4" color="#0e9300" fontWeight="bold" gutterBottom>
      Privacy Policy
    </Typography>

    <Typography paragraph>
      At MindCare, we are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our platform.
    </Typography>

    <Typography variant="h6" fontWeight="bold" mt={4}>
      1. Information We Collect
    </Typography>
    <Typography paragraph>
      We may collect the following types of information:
      <ul>
        <li><strong>Personal Information:</strong> Full name, email address, and password when you register.</li>
        <li><strong>Journal Entries:</strong> Voice or text inputs saved as part of your mental health journey.</li>
        <li><strong>Device & Usage Info:</strong> IP address, browser type, access times, and device info.</li>
      </ul>
    </Typography>

    <Typography variant="h6" fontWeight="bold" mt={4}>
      2. How We Use Your Information
    </Typography>
    <Typography paragraph>
      We use your data to:
      <ul>
        <li>Create and manage your account.</li>
        <li>Store your voice/text journal securely.</li>
        <li>Improve our features and offer personalized support.</li>
        <li>Send optional notifications (e.g. reminders, updates).</li>
      </ul>
    </Typography>

    <Typography variant="h6" fontWeight="bold" mt={4}>
      3. Data Protection
    </Typography>
    <Typography paragraph>
      Your data is stored securely using encrypted protocols. Only you have access to your journal. We do not sell or share your personal data with third parties without your explicit consent.
    </Typography>

    <Typography variant="h6" fontWeight="bold" mt={4}>
      4. Your Rights
    </Typography>
    <Typography paragraph>
      You can access, update, or delete your account and data at any time. To request deletion, contact us via support@mindcare.com.
    </Typography>

    <Typography variant="h6" fontWeight="bold" mt={4}>
      5. Third-Party Services
    </Typography>
    <Typography paragraph>
      We may integrate with third-party services for analytics, transcription, or notifications. These services are GDPR-compliant and only access minimal, anonymized data.
    </Typography>

    <Typography variant="h6" fontWeight="bold" mt={4}>
      6. Changes to This Policy
    </Typography>
    <Typography paragraph>
      We may update this Privacy Policy. Updates will be posted on this page with a revised effective date.
    </Typography>

    <Typography variant="h6" fontWeight="bold" mt={4}>
      7. Contact
    </Typography>
    <Typography paragraph>
      If you have questions about this policy, email us at support@mindcare.com.
    </Typography>
  </Container>
);
