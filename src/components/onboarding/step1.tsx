import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '@/components/reuseable/Button/Primary';
import { Button } from '@/components/ui/button';

export const Step1 = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleNext = () => {
    console.log('Name entered:', name);
    navigate('/onboarding/step2');
  };

  const handleBack = () => {
     navigate('/onboarding/step1');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="py-4 px-6">
        <h1 className="text-lg font-light">มารู้จักกันสักนิด</h1>
      </header>

      <main className="flex-1 flex flex-col px-6 pt-12">
        <div className="space-y-6">
          <h2 className="text-[32px] leading-tight font-light">
            สวัสดี...ยินดีที่ได้พบกัน
          </h2>
          <p className="text-[28px] leading-tight font-light">
            คุณให้ผมเรียกคุณว่าอะไร ?
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-end pb-8 space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ใส่ชื่อเรียกของคุณ"
            className="w-full h-[52px] px-6 text-[17px] bg-white rounded-full border border-gray-200
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-300
              transition-all duration-200"
          />

          <PrimaryButton
            onClick={handleNext}
            size="large"
          >
            เรียกชื่อนี้เลย
          </PrimaryButton>
        </div>
      </main>
    </div>
  );
};