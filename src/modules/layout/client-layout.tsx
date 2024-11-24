"use client";
import { Box, Button, IconButton, useMediaQuery } from "@mui/material";
import { NavBar } from "@/ui-components/NavigationBar";
import { NavigationDrawer } from "@/ui-components/NavigationDrawer";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./client-layout.css";
import { Toast } from "@/ui-components/Toast";
import Web3Provider from "@/modules/Web3Provider";
import { HomeOutlined } from "@mui/icons-material";
import { palette } from "@/theme/Palette";
import AnimatedBackground from "./background-animation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleNavBarLogo = () => {
    if (mobile === true && open === false) {
      setOpen(true);
    } else if (open === false) {
      route.push("/");
    }
  };
  const pathName = usePathname();
  const route = useRouter();
  const mobile = useMediaQuery("(max-width: 900px)");
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const pathSegments = pathName.split("/").filter(Boolean); // filter removes any empty strings

  // Assign breadcrumb parts
  const firstRoute = pathSegments[0] || "dashboard";
  const secondRoute = pathSegments[1];

  return (
    <Web3Provider>
      {/* {path === '/' ? (
          <Box>{children}</Box>
        ) : ( */}
      <Box className="pool-main-container">
        <Box className="drawer-left-container">
          <NavigationDrawer handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} open={open} />
        </Box>
        <AnimatedBackground />
        <Box className="main-right-container">
          <Box className="navbar-container">
            <NavBar handleopenSideBar={handleNavBarLogo} />
          </Box>

          <Box className="container-contant">
            {/* breadcrumbs */}
            {pathName !== "/" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  mt: 1,
                  ml: -1,
                }}
              >
                <IconButton onClick={() => route.push("/")} sx={{ borderRadius: 1, width: "28px", height: "28px" }}>
                  <HomeOutlined
                    sx={{
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </IconButton>
                <Button
                  onClick={() => route.push(`/${firstRoute}`)}
                  sx={{
                    background: "none",
                    paddingY: 0,
                    paddingX: 0.5,
                    m: 0,
                    height: "28px !important",
                    pt: 0.5,
                    color: firstRoute && !secondRoute ? palette.primary.main : palette.secondary.main,
                  }}
                >
                  {firstRoute.charAt(0).toUpperCase() + firstRoute.slice(1)}
                </Button>
                {secondRoute && (
                  <>
                    <Box
                      sx={{
                        background: "none",
                        paddingY: 0,
                        paddingX: 0,
                        color: "white",
                        m: 0,
                        height: "28px !important",
                        pt: 0.8,
                      }}
                    >
                      /
                    </Box>
                    <Button
                      sx={{
                        background: "none",
                        paddingY: 0,
                        paddingX: 0.5,
                        m: 0,
                        height: "28px !important",
                        width: "fit-content !important",
                        minWidth: "fit-content !important",
                        pt: 0.5,
                        color: palette.primary.main,
                      }}
                    >
                      {secondRoute.charAt(0).toUpperCase() + secondRoute.slice(1)}
                    </Button>
                  </>
                )}
              </Box>
            )}

            {children}
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            zIndex: 1,
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            background: "black",
          }}
        ></Box>
      </Box>
      {/* )} */}
    </Web3Provider>
  );
}
