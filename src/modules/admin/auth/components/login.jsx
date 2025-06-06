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
  Card,
  CardContent,
  Avatar,
  Container,
} from "@mui/material";
import { 
  Visibility, 
  VisibilityOff, 
  Email, 
  Lock, 
  Info,
  FavoriteRounded 
} from "@mui/icons-material";
import { useAdminLoginFormik } from "../formik/useLoginFormikAdmin";

const focusedStyles = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": { 
      borderColor: "#2196F3",
      borderWidth: 2,
    },
    "&:hover fieldset": {
      borderColor: "#42A5F5",
    }
  },
  "& .MuiInputLabel-root.Mui-focused": { 
    color: "#2196F3",
    fontWeight: 500,
  },
  "& .MuiOutlinedInput-input": {
    padding: "16px 14px",
  }
};

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const { formik, isLoggingIn } = useAdminLoginFormik({
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
        startAdornment: (
          <InputAdornment position="start">
            <Icon sx={{ 
              color: formik.touched[name] && formik.errors[name] ? "#f44336" : "#666",
              transition: "color 0.2s ease"
            }} />
          </InputAdornment>
        ),
        endAdornment: name === "password" && (
          <InputAdornment position="end">
            <IconButton 
              onClick={togglePasswordVisibility} 
              edge="end" 
              sx={{ color: "text.secondary" }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
        autoComplete: name === "password" ? "current-password" : "email",
      }}
      sx={{
        ...focusedStyles,
        mb: 3,
        "& .MuiFormHelperText-root": {
          marginLeft: 0,
          marginTop: "8px",
          fontSize: "0.875rem",
        }
      }}
    />
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 50%, #e8f5e8 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={24}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            background: "#fff",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, #2196F3, #21CBF3)",
            }
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #2196F3 0%, #3F51B5 100%)",
              padding: 6,
              textAlign: "center",
              color: "white",
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                backgroundColor: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                margin: "0 auto 16px auto",
                border: "2px solid rgba(255,255,255,0.3)",
              }}
            >
              <FavoriteRounded sx={{ fontSize: 40, color: "white" }} />
            </Avatar>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontSize: { xs: "2rem", lg: "2.5rem" },
                fontWeight: 300,
                mb: 1,
                letterSpacing: "0.5px"
              }}
            >
              Mindcare
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: "rgba(255,255,255,0.8)",
                fontSize: "1rem"
              }}
            >
              Admin Dashboard
            </Typography>
          </Box>

          <CardContent sx={{ padding: 4 }}>
            {/* Welcome Section */}
            <Box textAlign="center" mb={4}>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontSize: { xs: "1.75rem", lg: "2rem" },
                  fontWeight: 400,
                  color: "#1a1a1a",
                  mb: 1,
                }}
              >
                Welcome back
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ 
                  fontSize: "1rem",
                  mb: 2
                }}
              >
                Please sign in to your admin account
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: "#666",
                  backgroundColor: "#f5f5f5",
                  padding: "4px 12px",
                  borderRadius: "12px",
                  fontSize: "0.75rem"
                }}
              >
                Demo: admin@mindcare.com / password123
              </Typography>
            </Box>

            {/* Form */}
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
              noValidate
              autoComplete="off"
            >
              <Box sx={{ mb: 2 }}>
                {renderTextField("email", "Email Address", "email", "Enter your email", Email)}
                {renderTextField("password", "Password", showPassword ? "text" : "password", "Enter your password", Lock)}
              </Box>

              {/* Remember Me & Forgot Password */}
              <Box 
                sx={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  mb: 3,
                  fontSize: "0.875rem"
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Remember me
                </Typography>
                <Link
                  component="button"
                  type="button"
                  sx={{
                    color: "#2196F3",
                    cursor: "pointer",
                    fontWeight: 500,
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoggingIn || !formik.isValid || formik.isSubmitting}
                sx={{
                  py: 2,
                  fontSize: "1.125rem",
                  fontWeight: 500,
                  backgroundColor: "#2196F3",
                  borderRadius: 2,
                  color: "#fff",
                  textTransform: "none",
                  boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
                  "&:hover": {
                    backgroundColor: "#1976D2",
                    boxShadow: "0 6px 16px rgba(33, 150, 243, 0.4)",
                    transform: "translateY(-1px)",
                  },
                  "&:active": {
                    transform: "translateY(0px)",
                  },
                  "&:disabled": {
                    backgroundColor: "#e5e7eb",
                    color: "#9ca3af",
                    boxShadow: "none",
                  },
                  transition: "all 0.2s ease",
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

              <Box textAlign="center" mt={4}>
                <Typography variant="body2" color="text.secondary">
                  Need help?{" "}
                  <Link
                    component="button"
                    type="button"
                    sx={{
                      color: "#2196F3",
                      cursor: "pointer",
                      fontWeight: 500,
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Contact Support
                  </Link>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Footer */}
        <Box textAlign="center" mt={3}>
          <Typography variant="caption" color="text.secondary">
            © 2024 Mindcare. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};