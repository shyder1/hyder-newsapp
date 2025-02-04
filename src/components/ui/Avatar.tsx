import React, { FC, useState } from "react";
import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Divider,
  Modal,
  Button,
  Stack,
} from "@mui/material";
import { Logout, Settings, Person, Help } from "@mui/icons-material";
import CustomModal from "./Modal";
import PreferenceForm from "../PreferenceForm";

interface Props {
  name: string;
  avatarUrl: string;
}

const UserAvatar: FC<Props> = ({ name, avatarUrl }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPreferencesModal, setOpenPreferencesModal] = useState(false);
  const open = Boolean(anchorEl);

  const handleClosePreferences = () => {
    setOpenPreferencesModal(false);
  };

  // Open dropdown menu
  const handleClickAvatar = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close dropdown menu
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Open logout confirmation modal
  const handleOpenLogoutModal = () => {
    handleCloseMenu();
    setOpenPreferencesModal(true);
  };

  // Logout action
  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logging out");
    setOpenPreferencesModal(false);
  };

  return (
    <Box>
      {/* User Avatar */}
      <Avatar
        onClick={handleClickAvatar}
        sx={{
          cursor: "pointer",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
        alt={name}
        src={avatarUrl}
      >
        {name?.charAt(0).toUpperCase()}
      </Avatar>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            p: 0.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
      >
        <Typography sx={{ fontWeight: "600", ml: 2 }}>{name}</Typography>
        <MenuItem onClick={handleOpenLogoutModal}>My Preferences</MenuItem>
      </Menu>

      <CustomModal
        open={openPreferencesModal}
        onClose={handleClosePreferences}
        title="Your preferences"
      >
        <Stack className="w-112 h-80 bg-white rounded-lg">
          <PreferenceForm />
        </Stack>
      </CustomModal>
    </Box>
  );
};

export default UserAvatar;
