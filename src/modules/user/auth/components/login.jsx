import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
  Link,
  CircularProgress,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock, Info } from "@mui/icons-material";
import { useUserLoginFormik } from "../formik/useUserloginformik";

const focusedStyles = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": { borderColor: "#a78bfa" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#a78bfa" },
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const { formik, isLoggingIn } = useUserLoginFormik({
    mutationConfig: {
      onSuccess: () => {
        setTimeout(() => navigate("/dashboard"), 2000);
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
        autoComplete: name === "password" ? "current-password" : "email",
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
      noValidate
      autoComplete="off"
    >
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontSize: { xs: "2rem", lg: "2.5rem" },
            fontWeight: "bold",
            background: "linear-gradient(to right, #c084fc, #38bdf8)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            mb: 1,
          }}
        >
          Welcome Back
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontSize: "1.125rem" }}>
          Sign in to continue your journey
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {renderTextField("email", "Email Address", "email", "Enter your email", Email)}
        {renderTextField("password", "Password", showPassword ? "text" : "password", "Enter your password", Lock)}
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isLoggingIn || !formik.isValid || formik.isSubmitting}
        sx={{
          py: 1.5,
          fontSize: "1.125rem",
          fontWeight: 500,
          mt: 3,
          backgroundColor: "#a78bfa",
          borderRadius: 2,
          color: "#fff",
          "&:hover": {
            backgroundColor: "#8b5cf6",
            boxShadow: "0 4px 12px rgba(167, 139, 250, 0.4)",
          },
          "&:disabled": {
            backgroundColor: "#e5e7eb",
            color: "#9ca3af",
          },
        }}
      >
        {isLoggingIn ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={20} sx={{ color: "white" }} />
            Signing In...
          </Box>
        ) : (
          "Sign In"
        )}
      </Button>

      {formik.errors.submit && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {formik.errors.submit}
        </Alert>
      )}

      <Box textAlign="center" mt={3}>
        <Typography variant="body1" color="text.secondary">
          Don’t have an account?{" "}
          <Link
            onClick={() => navigate("/register")}
            sx={{
              color: "#7c3aed",
              cursor: "pointer",
              fontWeight: 500,
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Register here
          </Link>
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Alert
        severity="info"
        icon={<Info />}
        sx={{
          backgroundColor: "#f5f3ff",
          border: "1px solid #ddd6fe",
          "& .MuiAlert-icon": { color: "#a78bfa" },
        }}
      >
        <Typography variant="body2">
          <strong>Secure Login:</strong> Your credentials are encrypted and never shared.
        </Typography>
      </Alert>
    </Box>
  );
};
