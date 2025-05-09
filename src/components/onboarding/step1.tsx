import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const Step1 = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleNext = () => {
    // Log the entered name (will be empty string if nothing typed)
    console.log('Name entered:', name);

    // --- IMPORTANT CHANGE ---
    // Navigate to the next step REGARDLESS of whether the name input is empty or has whitespace
    navigate('/onboarding/step2'); // <-- Navigation happens unconditionally now
    // --- END IMPORTANT CHANGE ---

    // The previous condition if (name.trim()) { ... } is removed here
    // The disabled prop on the button related to name.trim() is also removed below
  };

  // Optional handleBack button logic
  const handleBack = () => {
     navigate('/onboarding/step1'); // Navigate back to the previous step
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="py-4 px-6">
        <h1 className="text-lg font-light">มารู้จักกันสักนิด</h1>
      </header>

      {/* Main content */}
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

          <Button
            onClick={handleNext} // Button calls handleNext
            // --- IMPORTANT CHANGE ---
            // Removed the disabled prop based on input content
            // disabled={!name.trim()} // <-- This line is REMOVED or COMMENTED OUT
            // The button is now always clickable
            // --- END IMPORTANT CHANGE ---
            className="w-full h-[52px] text-[17px] font-medium bg-[#2C2C2C] text-white
              hover:bg-black rounded-full transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed" // Keep disabled styles in case it's disabled by other means
          >
            เรียกชื่อนี้เลย
          </Button>

          {/* Optional "Back" button */}
          {/*
          <Button
            onClick={handleBack}
            variant="outline"
            className="w-full h-12 text-[17px] font-medium border-gray-200 hover:bg-gray-50 rounded-full transition-colors"
          >
            ย้อนกลับ
          </Button>
          */}
        </div>
      </main>
    </div>
  );
};
