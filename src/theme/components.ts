import { BorderColor, Height } from "@mui/icons-material";
import { Components, Theme } from "@mui/material/styles";

export const components: Components<Theme> = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        textTransform: "none",
        fontWeight: 500,
      },
      contained: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        transition: "all 0.3s ease-in-out",

        cursor: "pointer",
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        "&:hover": {
          boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;",
          border: "3px solid",
          borderColor: "primary",
          transform: "scale(1.01)", // Move slightly up instead of scaling
          zIndex: 10,
        },
      },
    },
  },
  MuiAutocomplete: {
    styleOverrides: {
      root: {
        height: "50px",
        // Global Autocomplete root styles
        "& .MuiOutlinedInput-root": {
          p: 0,
          height: "50px",
          borderRadius: "8px", // Customize border radius
          backgroundColor: "#ffffff",
          border: "1px solid",
          borderColor: "primary", // Light background
          color: "#333333",
          "&:hover": {
            backgroundColor: "#f0f0f0", // Slight color change on hover
          },
          "&.Mui-focused": {
            backgroundColor: "#ffffff", // White background when focused
          },
          "& .MuiInputBase-input": {
            height: "18px",

            color: "#333333", // Dark text color
            fontWeight: 500, // Slightly bolder text
            "&::placeholder": {
              color: "#888",
              opacity: 1, // Ensures placeholder is always visible
            },
            "&:not(:placeholder-shown)": {
              color: "inherit", // Ensures normal text color when filled
            },
          },
        },
        // Customize input text
      },
      inputRoot: {
        // Styles for the input container
        // paddingRight: "12px !important", // Adjust padding
        // "& .MuiAutocomplete-input": {
        //   padding: "8px 12px", // Custom input padding
        // },
      },
      tag: {
        // Chip/Tag styles
        margin: "4px",
        borderRadius: 8, // Rounded chips
        backgroundColor: "#e0e0e0", // Neutral chip background
        color: "#333333", // Chip text color
        "& .MuiChip-deleteIcon": {
          color: "#666666", // Delete icon color
          "&:hover": {
            color: "#000000",
          },
        },
      },
      listbox: {
        // Dropdown list styles
        backgroundColor: "#ffffff",
        borderRadius: 8,
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        "& .MuiAutocomplete-option": {
          // Individual option styles
          padding: "10px 16px",
          '&[aria-selected="true"]': {
            backgroundColor: "#f0f0f0", // Selected option background
          },
          "&:hover": {
            backgroundColor: "#f5f5f5", // Hover background
          },
        },
      },
      clearIndicator: {
        // Clear (x) button styles
        color: "#666666",
        "&:hover": {
          color: "#000000",
          backgroundColor: "rgba(0,0,0,0.08)",
        },
      },
      popupIndicator: {
        // Dropdown arrow styles
        color: "#666666",
        "&:hover": {
          color: "#000000",
          backgroundColor: "rgba(0,0,0,0.08)",
        },
      },
    },
    defaultProps: {
      // Default props for all Autocomplete components
      componentsProps: {
        paper: {
          elevation: 4, // Custom elevation for dropdown
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      rounded: {
        borderRadius: 12,
      },
      elevation1: {
        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: "outlined",
    },
    styleOverrides: {
      root: {
        "& .MuiInputLabel-root": {
          display: "none", // Hide label completely
        },
        "& .MuiOutlinedInput-root input": {
          padding: "0 6px",
          height: "48px",
        },
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        padding: 0,
        // Remove border and background
        border: "none",
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: "transparent",
          border: "none",
        },
        "&:focus": {
          backgroundColor: "transparent",
          border: "none",
        },
      },
    },
  },
  // Override Input variant styles
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        "& input": {
          outline: "none !important",
          boxShadow: "none !important",
          padding: "0 8px",
        },
        "& input:focus": {
          outline: "none !important",
          boxShadow: "none !important",
          padding: "0 8px",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: "none !important",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none !important",
        },
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          "&.Mui-focused": {
            outline: "none",
            border: "none",
          },
        },
        borderColor: "transparent",
        borderRadius: "8px", // 8px border radius
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#FFFFFF", // Hover state border
        },
        background: "#FFFFFF",
        "&::before": {
          borderBottom: "none",
        },
        "&::after": {
          borderBottom: "none",
        },
      },
    },
  },
  // Customize the standard variant
  MuiInput: {
    styleOverrides: {
      root: {
        // Underline color customization
        "&:after": {
          borderColor: "#FFFFFF", // Custom underline color when focused
        },
        "&:before": {
          borderColor: "#FFFFFF", // Lighter color for default state
        },
      },
    },
  },
  // Customize the filled variant
  MuiFilledInput: {
    styleOverrides: {
      root: {
        // Background and underline customizations
        backgroundColor: "#FFFFFF", // Very light purple background
        "&:hover": {
          backgroundColor: "#FFFFFF", // Slightly darker on hover
        },
        "&.Mui-focused": {
          backgroundColor: "#FFFFFF", // Keep background on focus
        },
        "&:after": {
          borderBottomColor: "#FFFFFF", // Custom underline color when focused
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: "none",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
      },
    },
  },
  MuiPagination: {
    styleOverrides: {
      root: ({ theme }) => ({
        "& .MuiPagination-ul": {
          gap: "4px",
        },
      }),
    },
    defaultProps: {
      shape: "rounded",
      variant: "outlined",
      color: "primary",
    },
  },
  MuiPaginationItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        margin: "0 2px",
        minWidth: 36,
        height: 36,

        "&.Mui-selected": {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          fontWeight: 600,

          "&:hover": {
            backgroundColor: theme.palette.primary.main,
          },
        },

        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },

        "&.MuiPaginationItem-ellipsis": {
          border: "none",
        },

        // First and Last buttons
        "&.MuiPaginationItem-firstLast": {
          "& .MuiSvgIcon-root": {
            fontSize: 20,
          },
        },

        // Previous and Next buttons
        "&.MuiPaginationItem-previousNext": {
          "& .MuiSvgIcon-root": {
            fontSize: 20,
          },
        },
      }),
      // Outlined variant specific styles
      outlined: ({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        "&.Mui-selected": {
          border: `1px solid ${theme.palette.primary.main}`,
        },
      }),
      // Contained variant specific styles
      text: ({ theme }) => ({
        "&.Mui-selected": {
          backgroundColor: theme.palette.primary.main,
        },
      }),
    },
  },
};
