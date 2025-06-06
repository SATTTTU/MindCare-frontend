import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Paper,
  Alert,
  Link,
  CircularProgress,
  Divider,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
  CheckCircle,
  Info,
} from "@mui/icons-material";
import { useUserRegisterFormik } from "../formik/useUserregisterformik";

const focusedStyles = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": { borderColor: "#0e9300" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#0e9300" },
};

const passwordRequirements = [
  "At least one uppercase letter (A-Z)",
  "At least one number (0-9)",
  "At least one special character (!@#$%^&*)",
];

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const { formik, isRegistering } = useUserRegisterFormik({
    mutationConfig: {
      onSuccess: (data) => {
        console.log("Registration successful:", data);
        setTimeout(() => navigate("/login"), 2000);
      },
      onError: (error) => {
        console.error("Registration failed:", error);
      },
    },
  });

  const renderTextField = (name, label, type, placeholder, Icon) => (
    <TextField
      fullWidth
      name={name}
      type={type}
      label={label}
      placeholder={placeholder}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {name === "password" ? (
              <IconButton onClick={togglePasswordVisibility} edge="end" sx={{ color: "text.secondary" }}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ) : (
              <Icon sx={{ color: "text.secondary" }} />
            )}
          </InputAdornment>
        ),
      }}
      sx={focusedStyles}
    />
  );

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        width: { xs: "100%", md: "66.666%" },
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h1" sx={{ fontSize: { xs: "2rem", lg: "2.5rem" }, fontWeight: "bold", color: "#0e9300", mb: 1 }}>
          Join Our Community
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontSize: "1.125rem" }}>
          Start your journey to better mental wellness
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {renderTextField("name", "Full Name", "text", "Enter your full name", Person)}
        {renderTextField("email", "Email Address", "email", "Enter your email address", Email)}
        {renderTextField("password", "Password", showPassword ? "text" : "password", "Create a strong password", Lock)}

        <Paper sx={{ backgroundColor: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 2, p: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#0c4a6e", mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
            <Lock fontSize="small" />
            Password Requirements:
          </Typography>
          <Box sx={{ pl: 3 }}>
            {passwordRequirements.map((req, i) => (
              <Typography key={i} variant="caption" sx={{ display: "flex", alignItems: "center", color: "#0c4a6e", mb: 0.5 }}>
                <CheckCircle sx={{ fontSize: 12, mr: 1, color: "#0e9300" }} />
                {req}
              </Typography>
            ))}
          </Box>
        </Paper>
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            sx={{ color: "#0e9300", "&.Mui-checked": { color: "#0e9300" } }}
          />
        }
        label={
          <Typography variant="body2" color="text.secondary">
            I agree to the{" "}
            <Link onClick={() => navigate("/register/terms")} sx={{ color: "#0e9300", cursor: "pointer", fontWeight: 500, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link onClick={() => navigate("/register/policy")} sx={{ color: "#0e9300", cursor: "pointer", fontWeight: 500, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
              Privacy Policy
            </Link>
            . I understand that my data will be handled securely and confidentially.
          </Typography>
        }
        sx={{ mt: 3, alignItems: "flex-start" }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isRegistering || !formik.isValid || formik.isSubmitting || !agreeTerms}
        sx={{
          py: 1.5,
          fontSize: "1.125rem",
          fontWeight: 500,
          mt: 3,
          backgroundColor: "#238f17",
          "&:hover": {
            backgroundColor: "#1e7a14",
            boxShadow: "0 4px 12px rgba(35, 143, 23, 0.3)",
          },
          "&:disabled": {
            backgroundColor: "#e5e7eb",
            color: "#9ca3af",
          },
          borderRadius: 2,
        }}
      >
        {isRegistering ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={20} sx={{ color: "white" }} />
            Creating Account...
          </Box>
        ) : (
          "Create Account"
        )}
      </Button>

      {formik.errors.submit && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {formik.errors.submit}
        </Alert>
      )}

      <Box textAlign="center" mt={3}>
        <Typography variant="body1" color="text.secondary">
          Already have an account?{" "}
          <Link
            onClick={() => navigate("/login")}
            sx={{
              color: "#0e9300",
              cursor: "pointer",
              fontWeight: 500,
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Sign in here
          </Link>
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Alert
        severity="info"
        icon={<Info />}
        sx={{
          backgroundColor: "#f0f9ff",
          border: "1px solid #bae6fd",
          "& .MuiAlert-icon": { color: "#0e9300" },
        }}
      >
        <Typography variant="body2">
          <strong>Your privacy matters.</strong> All information is encrypted and confidential. We're here to support your mental wellness journey in a safe, secure environment.
        </Typography>
      </Alert>
    </Box>
  );
};
