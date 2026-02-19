import { Layout, LayoutProps } from "react-admin";
import { AdminAppBar } from "./AdminAppBar";
import { AdminMenu } from "./AdminMenu";
import { DemoBanner } from "./DemoBanner";

export const AdminLayout = (props: LayoutProps) => (
  <>
    <DemoBanner />
    <Layout {...props} appBar={AdminAppBar} menu={AdminMenu} />
  </>
);

