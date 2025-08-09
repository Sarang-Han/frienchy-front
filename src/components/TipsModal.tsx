'use client';

import { useChat } from '@/context/ChatContext';
import { TipCategory } from '@/types/chat';

const tipCategories: TipCategory[] = [
  {
    title: "상권 분석",
    items: ["우리동네 유동인구", "상권 경쟁업체", "임대료 정보", "교통 접근성"]
  },
  {
    title: "프랜차이즈 정보",
    items: ["브랜드별 가맹비", "성공률 통계", "매출 데이터", "가맹점 현황"]
  },
  {
    title: "창업 준비",
    items: ["사업자등록", "인허가 절차", "자금 조달", "마케팅 전략"]
  }
];

const TipsModal = () => {
  const { showTipsModal, setShowTipsModal, handleTipSelect } = useChat();

  if (!showTipsModal) return null;

  const handleClose = () => setShowTipsModal(false);

  return (
    <>
      {/* 오버레이 */}
      <div
        className="absolute inset-0 bg-[rgba(0,0,0,0.6)] z-50"
        onClick={handleClose}
      />
      {/* 모달 콘텐츠 */}
      <div
        className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl max-h-[70vh] overflow-y-auto z-60"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">궁금한 내용을 키워드로 선택해보세요</h2>
            <button
              onClick={handleClose}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <span className="text-gray-500 text-xl">×</span>
            </button>
          </div>
          <div className="space-y-6">
            {tipCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">{category.title}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {category.items.map((item, itemIndex) => (
                    <button
                      key={itemIndex}
                      onClick={() => handleTipSelect(item)}
                      className="p-3 text-left bg-gray-50 rounded-xl hover:bg-[#eb8401] hover:text-white transition-colors text-sm"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TipsModal;
