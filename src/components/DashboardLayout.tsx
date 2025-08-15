import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // 1. Create a ref for the scrollable main content area
  const mainContentRef = useRef<HTMLElement>(null);
  
  // 2. Get the current location to detect route changes
  const location = useLocation();

  useEffect(() => {
    // 3. This effect runs whenever the route path changes
    // Check if the ref exists and scroll it to the top
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
  }, [location.pathname]); // 4. Depend on location.pathname to trigger the effect

  return (
    <div className="h-screen bg-gray-900 flex overflow-hidden">
      {/* Sidebar - Fixed position */}
      <div className="flex-shrink-0">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar - Fixed at top */}
        <div className="flex-shrink-0">
          <TopBar onMenuClick={() => setSidebarOpen(true)} />
        </div>
        
        {/* Scrollable Content Area with Custom Scrollbar */}
        <main 
          ref={mainContentRef} // 5. Attach the ref to the scrollable element
          className="flex-1 overflow-y-auto overflow-x-hidden main-scrollbar"
        >
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;