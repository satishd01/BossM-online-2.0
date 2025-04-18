// useMenuItems.js
import { useEffect, useState } from "react";
import { allMenuItems } from "./MenuItems";

export default function useMenuItems() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const filtered = allMenuItems.filter((item) =>
      item.allowedRoles.includes(role)
    );
    setMenuItems(filtered);
  }, []);

  return menuItems;
}
