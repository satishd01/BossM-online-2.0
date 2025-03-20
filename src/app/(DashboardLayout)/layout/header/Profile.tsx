import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import CommonAlert from "@/components/common/alert";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  useEffect(() => {
    handleClose2();
  }, [confirmLogout]);

  const router = useRouter();
  return (
    <>
      <CommonAlert
        Icon="logout"
        showModal={confirmLogout}
        AlertDiaogTitle="Come Back Soon"
        title="Come Back Soon"
        description="Are you sure you want to Logout?"
        ButtonText="Logout"
        onContinue={() => {
          setConfirmLogout(false);
          localStorage.clear();
          router.push("/authentication/login");
        }}
        onCancel={() => {
          setConfirmLogout(false);
          // setDeleteSiteId(undefined);
        }}
        titleClassName="text-center"
        contentClassName="w-full flex-col flex justify-center items-center gap-8"
        descriptionclassName="text-black"
      />
      <Box>
        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          sx={{
            ...(typeof anchorEl2 === "object" && {
              color: "primary.main",
            }),
          }}
          onClick={handleClick2}
        >
          <Avatar
            src="/images/profile/user-1.jpg"
            alt="image"
            sx={{
              width: 35,
              height: 35,
            }}
          />
        </IconButton>
        {/* ------------------------------------------- */}
        {/* Message Dropdown */}
        {/* ------------------------------------------- */}
        <Menu
          id="msgs-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleClose2}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "200px",
            },
          }}
        >
          <MenuItem onClick={() => router?.push("/profile")}>
            <ListItemIcon>
              <IconUser width={20} />
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
          </MenuItem>

          <Box mt={1} py={1} px={2}>
            <Button
              onClick={() => {
                setConfirmLogout(true);
              }}
              variant="outlined"
              color="primary"
              fullWidth
            >
              Logout
            </Button>
          </Box>
        </Menu>
      </Box>
    </>
  );
};

export default Profile;
