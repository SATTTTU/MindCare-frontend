import React from "react";
import Slider from "react-slick";
import { Box, Typography, Button, Container, Stack } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Favorite, Psychology } from "@mui/icons-material";
import { Message, MenuBook, Diversity3, Spa } from "@mui/icons-material";

// Custom Arrow Components
const NextArrow = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      right: -30,
      transform: "translateY(-50%)",
      zIndex: 1,
      cursor: "pointer"
    }}
  >
    <ArrowForwardIos sx={{ color: "#555" }} />
  </Box>
);

const PrevArrow = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      left: -30,
      transform: "translateY(-50%)",
      zIndex: 1,
      cursor: "pointer"
    }}
  >
    <ArrowBackIos sx={{ color: "#555" }} />
  </Box>
);

// Slider data
const slides = [
  {
    icon: <Message fontSize="large" color="primary" />,
    emoji: "🧘‍♀️",
    caption: "Talk to certified therapists anytime, anywhere.",
    bg: "#e3f2fd"
  },
  {
    icon: <MenuBook fontSize="large" color="success" />,
    emoji: "📝",
    caption: "Track your mood and reflect with guided journaling.",
    bg: "#e8f5e9"
  },
  {
    icon: <Diversity3 fontSize="large" color="error" />,
    emoji: "🤝",
    caption: "Connect with others through supportive community spaces.",
    bg: "#fce4ec"
  },
  {
    icon: <Spa fontSize="large" color="secondary" />,
    emoji: "🌸",
    caption: "Practice mindfulness with calming meditations.",
    bg: "#ede7f6"
  }
];

const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <Box sx={{ background: "#f4f6f8", py: 10 }}>
      <Container>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={8}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Left - Text */}
          <Box>
            <Typography variant="h2" fontWeight="bold" gutterBottom>
              Your Mental{" "}
              <Box component="span" sx={{ color: "#0e9300" }}>
                Well-being
              </Box>{" "}
              Starts Here.
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Find therapy, self-help tools, and supportive community – all in one place.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                sx={{ backgroundColor: "#0e9300", "&:hover": { backgroundColor: "#0c7a00" } }}
                startIcon={<Favorite />}
              >
                Start Therapy
              </Button>
              <Button
                variant="contained"
                size="large"
                sx={{ backgroundColor: "#42a5f5", "&:hover": { backgroundColor: "#1e88e5" } }}
                startIcon={<Psychology />}
              >
                Explore Resources
              </Button>
            </Stack>
            <Typography variant="body2" sx={{ mt: 3, color: "text.secondary" }}>
              🔐 Private, secure & accessible mental health support.
            </Typography>
          </Box>

          {/* Right - Slider */}
          <Box sx={{ width: { xs: "100%", md: "45%" }, position: "relative" }}>
            <Slider {...settings}>
              {slides.map((slide, index) => (
                <Box
                  key={index}
                  sx={{
                    backgroundColor: slide.bg,
                    borderRadius: 4,
                    minHeight: 320,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 4,
                    textAlign: "center"
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                    {slide.icon}
                    <Typography fontSize={50}>{slide.emoji}</Typography>
                  </Stack>
                  <Typography variant="h6" color="text.primary">
                    {slide.caption}
                  </Typography>
                </Box>
              ))}
            </Slider>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default HeroSection;
