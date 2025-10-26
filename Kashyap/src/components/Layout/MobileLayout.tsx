import { ReactNode } from "react";
import BottomNav from "./BottomNav";

interface MobileLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

const MobileLayout = ({ children, showBottomNav = true }: MobileLayoutProps) => {
  return (
    <div className="mobile-container">
      <div className="page-content">
        {children}
      </div>
      {showBottomNav && <BottomNav />}
    </div>
  );
};

export default MobileLayout;
