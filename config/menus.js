import {
  DashBoard,
  Graph
} from "@/components/svg";

export const menusConfig = {
  sidebarNav: {
    modern: [
      {
        title: "Dashboard",
        icon: DashBoard,
        child: [
          {
            title: "Dashboard",
            href: "/dashboard",
            icon: Graph,
          }
        ],
      }
    ],
  },
};
