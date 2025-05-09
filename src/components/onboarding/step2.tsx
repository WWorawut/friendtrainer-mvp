import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const Step2 = () => {
  const navigate = useNavigate();

  const handleNext = async () => {
    navigate('/chat');
  };

  const handleBack = () => {
    navigate('/onboarding/step1');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="py-4 px-6">
        <h1 className="text-lg font-light">ขั้นตอนที่ 2 จาก 4</h1>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col px-6 pt-12">
        <div className="space-y-6">
          <h2 className="text-[32px] leading-tight font-light">
            ขอทราบเพศของคุณ
          </h2>
          <p className="text-[28px] leading-tight font-light">
            เพื่อให้เราสามารถแนะนำโปรแกรมที่เหมาะสมกับคุณ
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-end pb-8 space-y-3">
          <Button
            onClick={handleBack}
            variant="outline"
            className="w-full h-[52px] text-[17px] font-medium border-gray-200
              hover:bg-gray-50 rounded-full transition-colors"
          >
            ย้อนกลับ
          </Button>

          <Button
            onClick={handleNext}
            className="w-full h-[52px] text-[17px] font-medium bg-[#2C2C2C] text-white 
              hover:bg-black rounded-full transition-colors"
          >
            ถัดไป
          </Button>
        </div>
      </main>
    </div>
  );
};