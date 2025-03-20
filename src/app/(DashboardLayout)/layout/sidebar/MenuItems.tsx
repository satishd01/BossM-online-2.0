import {
  AccountBoxOutlined,
  AssuredWorkloadOutlined,
  NotificationsNoneOutlined,
  PaidOutlined,
  PhoneAndroidOutlined,
  PhotoSizeSelectActualOutlined,
  SettingsOutlined,
  TableRowsOutlined,
  RuleTwoTone,
  GridViewOutlined,
  InsertPhotoOutlined,
  RadarTwoTone
} from "@mui/icons-material";
import {
  IconBrandOffice,
  IconCurrencyRupee,
  IconUserPlus,
  IconDeviceGamepad,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: GridViewOutlined,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Declare Results",
    icon: RadarTwoTone,
    href: "/declare-result",
  },
  {
    id: uniqueId(),
    title: "Winning history",
    icon: TableRowsOutlined,
    href: "/winning-history",
  },
  {
    id: uniqueId(),
    title: "Markets",
    icon: IconBrandOffice,
    href: "/markets",
  },
  {
    id: uniqueId(),
    title: "Games",
    icon: IconDeviceGamepad,
    href: "/games",
  },
  {
    id: uniqueId(),
    title: "Bids",
    icon: TableRowsOutlined,
    href: "/bid-history",
  },
  {
    id: uniqueId(),
    title: "Withdraw request",
    icon: TableRowsOutlined,
    href: "/withdraw-request",
  },
  {
    id: uniqueId(),
    title: "Users",
    icon: IconUserPlus,
    href: "/users",
  },
  {
    id: uniqueId(),
    title: "Deposit request",
    icon: AssuredWorkloadOutlined,
    href: "/deposit-request",
  },
  {
    id: uniqueId(),
    title: "Banner",
    icon: InsertPhotoOutlined,
    href: "/banner",
  },
  {
    id: uniqueId(),
    title: "Notice Board",
    icon: RuleTwoTone,
    href: "/notice-board",
  },
  {
    id: uniqueId(),
    title: "Notifications",
    icon: NotificationsNoneOutlined,
    href: "/notifications",
  },
  // {
  //   id: uniqueId(),
  //   title: "Games rates",
  //   icon: IconCurrencyRupee,
  //   href: "/games-rates",
  // }
];

export default Menuitems;
