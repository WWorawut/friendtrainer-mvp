import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Define the type for the coach characteristic options
interface CharacteristicOption {
  id: string;
  text: string;
}

// Define the Onboarding Step 3 Component
export const Step3 = () => {
  const navigate = useNavigate();
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<string[]>([]);

  const characteristicOptions: CharacteristicOption[] = [
    { id: 'male-polite-strong', text: 'ผู้ชาย สุภาพ เรียบร้อย แต่แข็งแกร่ง' },
    { id: 'lgbtq-fun-confident', text: 'LGBTQ+ สนุกสนาน เฮฮา มั่นใจ' },
  ];

  const handleSelectOption = (optionId: string) => {
    setSelectedCharacteristics(prevSelected => {
      if (prevSelected.includes(optionId)) {
        return prevSelected.filter(id => id !== optionId);
      } else {
        return [...prevSelected, optionId];
      }
    });
  };

  const handleSave = () => {
    if (selectedCharacteristics.length > 0) {
      console.log('Selected characteristics:', selectedCharacteristics);
      navigate('/onboarding/step-4');
    } else {
      console.log('Please select at least one characteristic.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="py-4 px-4 border-b bg-white">
        <div className="max-w-lg mx-auto">
          <h1 className="font-heading text-xl">มารู้จักกันสักนิด</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 pt-8">
        <div className="w-full max-w-lg space-y-6">
          <div className="space-y-4 text-left">
            <h3 className="font-heading text-lg">มารู้จักกันสักนิด</h3>
            <h2 className="font-heading text-2xl leading-tight">
              สวัสดีผมโค้ช [ชื่อโค้ช]
              <br/>
              ยินดีมากๆ และพร้อม
              <br/>
              จะลุยไปกับคุณ
            </h2>
            <p className="text-lg text-gray-800">
              คุณอยากให้ผมมีคุณลักษณะแบบไหน ?
            </p>
          </div>

          <div className="space-y-3">
            {characteristicOptions.map(option => (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                className={`w-full px-6 py-4 border rounded-full text-lg font-medium transition-colors duration-200
                           ${selectedCharacteristics.includes(option.id)
                             ? 'bg-blue-600 text-white border-blue-600'
                             : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
                           }`}
              >
                {option.text}
              </button>
            ))}
          </div>

          <div className="mt-auto pt-8">
             <Button
               onClick={handleSave}
               disabled={selectedCharacteristics.length === 0}
               className="w-full h-12 bg-[#2C2C2C] text-white hover:bg-black rounded-full"
             >
               บันทึก
             </Button>
          </div>
        </div>
      </main>
    </div>
  );
};