import { defaultTheme } from "react-admin";

export const adminTheme = {
  ...defaultTheme,
  palette: {
    primary: {
      main: "#059669", // emerald-600
      light: "#10b981", // emerald-500
      dark: "#047857", // emerald-700
      contrastText: "#fff",
    },
    secondary: {
      main: "#0d9488", // teal-600
      light: "#14b8a6", // teal-500
      dark: "#0f766e", // teal-700
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
    text: {
      primary: "#404040", // neutral-700
      secondary: "#737373", // neutral-500
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 800,
      fontSize: "2rem",
      color: "#404040",
    },
    h2: {
      fontWeight: 700,
      fontSize: "1.5rem",
      color: "#404040",
    },
    h3: {
      fontWeight: 700,
      fontSize: "1.25rem",
      color: "#404040",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.125rem",
      color: "#404040",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1rem",
      color: "#404040",
    },
    h6: {
      fontWeight: 600,
      fontSize: "0.875rem",
      color: "#404040",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "none",
        },
        elevation1: {
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          padding: "8px 16px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        contained: {
          backgroundColor: "#059669",
          color: "#fff",
          border: "none",
          "&:hover": {
            backgroundColor: "#047857",
          },
        },
        outlined: {
          border: "1px solid #d4d4d4",
          color: "#404040",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            border: "1px solid #a3a3a3",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "14px 16px",
          borderBottom: "1px solid #f5f5f5",
        },
        head: {
          fontWeight: 700,
          backgroundColor: "#fafafa",
          color: "#404040",
          borderBottom: "1px solid #e5e5e5",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.02) !important",
          },
          "&.Mui-selected": {
            backgroundColor: "rgba(5, 150, 105, 0.08) !important",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "& fieldset": {
              borderColor: "#e5e5e5",
              borderWidth: "1px",
            },
            "&:hover fieldset": {
              borderColor: "#d4d4d4",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#059669",
              borderWidth: "1px",
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: "1px solid #e5e5e5",
          boxShadow: "none",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
    RaDatagrid: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          "& .RaDatagrid-headerCell": {
            fontWeight: 700,
            backgroundColor: "#fafafa",
          },
        },
      },
    },
    RaList: {
      styleOverrides: {
        root: {
          "& .RaList-main": {
            marginTop: 0,
          },
        },
      },
    },
    RaFilterForm: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          padding: "16px",
          borderRadius: 12,
          marginBottom: "16px",
          border: "2px solid #e5e5e5",
        },
      },
    },
    RaMenuItemLink: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: "4px 8px",
          paddingLeft: 16,
          paddingRight: 16,
          color: "#404040",
          transition: "all 0.2s ease",
          "&.RaMenuItemLink-active": {
            backgroundColor: "rgba(5, 150, 105, 0.1)",
            color: "#059669",
            fontWeight: 700,
            borderLeft: "4px solid #059669",
            paddingLeft: 12,
          },
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.05)",
          },
          "& .MuiListItemIcon-root": {
            minWidth: "auto",
            marginRight: "12px",
            color: "#737373",
          },
          "&.RaMenuItemLink-active .MuiListItemIcon-root": {
            color: "#059669",
          },
        },
      },
    },
    RaSidebar: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
    RaAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "white !important",
          color: "#404040 !important",
          boxShadow: "none !important",
        },
        toolbar: {
          backgroundColor: "white !important",
        },
      },
    },
  },
};

