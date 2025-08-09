import { Bars3Icon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  onMenuClick?: () => void;
  onSettingsClick?: () => void;
}

const Header = ({ onMenuClick, onSettingsClick }: HeaderProps) => {
  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between z-40 w-full max-w-[414px]">
      {/* Left - Menu Toggle */}
      <button 
        onClick={onMenuClick}
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
        onClick={onSettingsClick}
        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-50 transition-colors"
      >
        <EllipsisVerticalIcon className="w-6 h-6 text-gray-700" />
      </button>
    </div>
  );
};

export default Header;
