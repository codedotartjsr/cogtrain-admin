import DashBoardLayoutProvider from "@/provider/dashboard.layout.provider";
const layout = async ({ children, params: { lang } }) => {

  return (
    <DashBoardLayoutProvider>{children}</DashBoardLayoutProvider>
  );
};

export default layout;
