// menuItems.js
import {
  AssuredWorkloadOutlined,
  NotificationsNoneOutlined,
  TableRowsOutlined,
  RuleTwoTone,
  GridViewOutlined,
  InsertPhotoOutlined,
  RadarTwoTone,
} from "@mui/icons-material";

import {
  IconBrandOffice,
  IconUserPlus,
  IconDeviceGamepad,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

export const allMenuItems = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: GridViewOutlined,
    href: "/",
    allowedRoles: ["ADMIN", "AGENT"],
  },
  {
    id: uniqueId(),
    title: "Declare Results",
    icon: RadarTwoTone,
    href: "/declare-result",
    allowedRoles: ["ADMIN"],
  },
  {
    id: uniqueId(),
    title: "Winning history",
    icon: TableRowsOutlined,
    href: "/winning-history",
    allowedRoles: ["ADMIN", "AGENT"],
  },
  {
    id: uniqueId(),
    title: "Markets",
    icon: IconBrandOffice,
    href: "/markets",
    allowedRoles: ["ADMIN"],
  },
  {
    id: uniqueId(),
    title: "Games",
    icon: IconDeviceGamepad,
    href: "/games",
    allowedRoles: ["ADMIN"],
  },
  {
    id: uniqueId(),
    title: "Bid History",
    icon: TableRowsOutlined,
    href: "/bid-history",
    allowedRoles: ["ADMIN", "AGENT"],
  },
  {
    id: uniqueId(),
    title: "Withdraw request",
    icon: TableRowsOutlined,
    href: "/withdraw-request",
    allowedRoles: ["ADMIN"],
  },
  {
    id: uniqueId(),
    title: "Users",
    icon: IconUserPlus,
    href: "/users",
    allowedRoles: ["ADMIN", "AGENT"],
  },
  {
    id: uniqueId(),
    title: "Deposit request",
    icon: AssuredWorkloadOutlined,
    href: "/deposit-request",
    allowedRoles: ["ADMIN"],
  },
  {
    id: uniqueId(),
    title: "Banner",
    icon: InsertPhotoOutlined,
    href: "/banner",
    allowedRoles: ["ADMIN"],
  },
  {
    id: uniqueId(),
    title: "Notice Board",
    icon: RuleTwoTone,
    href: "/notice-board",
    allowedRoles: ["ADMIN"],
  },
  {
    id: uniqueId(),
    title: "Notifications",
    icon: NotificationsNoneOutlined,
    href: "/notifications",
    allowedRoles: ["ADMIN"],
  },
  {
    id: uniqueId(),
    title: "Agent",
    icon: IconUserPlus,
    href: "/agent",
    allowedRoles: ["ADMIN"],
  },
];
