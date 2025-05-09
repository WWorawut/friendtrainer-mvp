import { useState } from 'react'; // Import useState for managing input state
import { useNavigate } from 'react-router-dom';
// Assuming Button component is available at this path from Radix/Tailwind setup
import { Button } from '@/components/ui/button';

export const Step2 = () => {
  const navigate = useNavigate();
  // State to hold the user's preferred name for the coach
  const [coachName, setCoachName] = useState(''); // State for the input field

  // Handler for the "Next" button click
  const handleNext = () => {
    // TODO: Store the coach name temporarily (e.g., in context or state passed from parent)
    // You can still use coachName here to get the value the user typed
    console.log('Coach name entered:', coachName); // Log the value regardless of whether it's empty

    // Navigate to the next onboarding step (placeholder route)
    // This navigation now happens REGARDLESS of whether the coachName input is empty
    navigate('/onboarding/step3'); // <--- ย้าย navigate ออกมานอกเงื่อนไข if

    // You can still keep the check if you want to do something ONLY when input is NOT empty
    // if (coachName.trim()) {
    //   // Logic to run only if input is not empty
    // }
  };

  // handleBack button logic (optional, based on design flow)
  const handleBack = () => {
     navigate('/onboarding/step1'); // Navigate back to the previous step
  };


  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header section */}
      <header className="py-4 px-4 border-b">
        <div className="max-w-lg mx-auto">
          <h1 className="font-heading text-xl">ขั้นตอนที่ 2 จาก 4</h1>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-lg space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-heading text-3xl">
                คุณจะเรียกผมว่าอะไร ?
              </h2>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                value={coachName}
                onChange={(e) => setCoachName(e.target.value)}
                placeholder="พิมพ์ชื่อโค้ชของคุณ"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />

              {/* "Next" button */}
              <Button
                onClick={handleNext} // Button still calls handleNext
                // You might want to remove the disabled prop if navigation should always happen
                // Or keep it if the button should only be clickable when input is not empty
                // If you remove disabled, the button is always clickable.
                // If you keep disabled, the button is only clickable when input has text.
                // Based on your report, you want navigation to happen, so let's remove disabled for now.
                // disabled={!coachName.trim()} // <--- พิจารณาว่าจะลบออกหรือไม่
                className="w-full h-12 bg-primary-600 text-white hover:bg-primary-700 rounded-full"
              >
                ถัดไป
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
          </div>
        </div>
      </main>
    </div>
  );
};
