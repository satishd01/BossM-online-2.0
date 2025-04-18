import React from "react";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import useMenuItems from "./usemenuitem"; // ✅ Hook

// ✅ Define the type inline
interface MenuItem {
  id: string;
  title: string;
  icon: React.ElementType;
  href: string;
  allowedRoles: string[];
}

const SidebarItems = ({
  toggleMobileSidebar,
}: {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}) => {
  const pathname = usePathname();
  const pathDirect = pathname;

  // ✅ Explicitly tell TypeScript this is an array of MenuItem
  const menuItems: MenuItem[] = useMenuItems();

  return (
    <Box sx={{ px: "20px" }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {menuItems.map((item) => (
          <NavItem
            item={item}
            key={item.id}
            pathDirect={pathDirect}
            onClick={toggleMobileSidebar}
          />
        ))}
      </List>
    </Box>
  );
};

export default SidebarItems;
