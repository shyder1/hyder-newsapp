import { Modal, Typography, IconButton, Stack } from "@mui/material";

import { Cancel } from "@mui/icons-material";

const CustomModal = ({ open, onClose, title, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Stack className="bg-white relative">
        <Stack>
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", top: "1rem", right: "1rem" }}
            className="absolute top-2 right-2"
          >
            <Cancel />
          </IconButton>
        </Stack>

        <Typography variant="h5" sx={{ mb: 1, mt: 2, ml: "1rem" }}>
          {title}
        </Typography>

        {children}
      </Stack>
    </Modal>
  );
};

export default CustomModal;
