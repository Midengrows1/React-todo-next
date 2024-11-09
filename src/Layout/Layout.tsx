import { ReactNode } from "react";
import s from "./layout.module.sass";
import Header from "../components/Header/Header";
interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={s.layout}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
