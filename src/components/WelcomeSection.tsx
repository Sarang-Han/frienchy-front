import Image from 'next/image';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

interface WelcomeSectionProps {
  username: string;
  onQuickKeyword: (keyword: string) => void;
  onShowTips: () => void;
}

const quickKeywords = [
  "프랜차이즈 비용",
  "상권 분석", 
  "가맹점 정보",
  "창업 절차"
];

const WelcomeSection = ({ username, onQuickKeyword, onShowTips }: WelcomeSectionProps) => {
  return (
    <div className="flex-1 px-6 pt-8 pb-12 overflow-y-auto">
      {/* Profile & Greeting */}
      <div className="mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-[#eb8401] rounded-full flex items-center justify-center mb-6 shadow-lg overflow-hidden border-2 border-white">
          <Image
            src="/pic.jpg"
            alt="Frienchy 챗봇 캐릭터"
            width={64}
            height={64}
            className="w-full h-full object-cover rounded-full"
            priority
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
          {username} 님<br />
          무엇을 도와드릴까요?
        </h1>
        <p className="text-gray-600 text-base leading-relaxed">
          궁금한 점을 물어보면 빠르게 해결해 드려요.
        </p>
      </div>

      {/* Quick Keywords */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {quickKeywords.map((keyword, index) => (
            <button
              key={index}
              onClick={() => onQuickKeyword(keyword)}
              className="px-4 py-2 bg-white rounded-full border border-gray-200 text-gray-700 text-sm hover:bg-gray-50 hover:border-[#eb8401] transition-colors shadow-sm"
            >
              {keyword}
            </button>
          ))}
        </div>
      </div>

      {/* Tips Button */}
      <button
        onClick={onShowTips}
        className="flex items-center space-x-2 text-[#eb8401] text-sm font-medium"
      >
        <QuestionMarkCircleIcon className="w-4 h-4" />
        <span>챗봇 이렇게 써보세요</span>
      </button>
    </div>
  );
};

export default WelcomeSection;
