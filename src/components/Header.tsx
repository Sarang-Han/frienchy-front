'use client';

import { Bars3Icon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const handleMenuClick = () => {
    // TODO: 메뉴 사이드바 열기
    console.log('Menu clicked');
  };

  const handleSettingsClick = () => {
    // TODO: 설정 페이지 열기
    console.log('Settings clicked');
  };

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between z-40 w-full max-w-[414px]">
      {/* Left - Menu Toggle */}
      <button 
        onClick={handleMenuClick}
        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Bars3Icon className="w-6 h-6 text-gray-700" />
      </button>
      
      {/* Center - Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-lg font-bold text-gray-900">Frienchy</span>
      </div>
      
      {/* Right - Settings */}
      <button 
        onClick={handleSettingsClick}
        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-50 transition-colors"
      >
        <EllipsisVerticalIcon className="w-6 h-6 text-gray-700" />
      </button>
    </div>
  );
};

export default Header;
