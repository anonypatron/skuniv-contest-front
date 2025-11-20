import { useState } from "react";

const GE_CATEGORIES = ["인문과예술", "과학과기술", "사회와평화", "문화와역사", "진로와취업"];
const DAYS = ["월", "화", "수", "목", "금"];

interface AutoOptions {
    year: number;
    semester: number;
    targetCredits: number;
    geCategories: string[];
    freeDays: string[];
}

interface Props {
    year: number;
    semester: number;
    onGenerate: (options: AutoOptions) => void;
}

export default function AutoGenerateForm({ year, semester, onGenerate }: Props) {
    const [options, setOptions] = useState<AutoOptions>({
        year: year,
        semester: semester,
        targetCredits: 18,
        geCategories: [],
        freeDays: [],
    });

    const toggleCategory = (category: string) => {
        setOptions(prev => ({
            ...prev,
            geCategories: prev.geCategories.includes(category)
                ? prev.geCategories.filter(c => c !== category)
                : [...prev.geCategories, category]
        }));
    };

    const toggleFreeDay = (day: string) => {
        setOptions(prev => ({
            ...prev,
            freeDays: prev.freeDays.includes(day)
                ? prev.freeDays.filter(d => d !== day)
                : [...prev.freeDays, day]
        }));
    };

    return (
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded">STEP 2</span>
                자동 생성 조건
            </h2>
            
            {/* 목표 학점 */}
            <div className="mb-4">
                <label className="block text-xs font-bold text-gray-500 mb-1">목표 총 학점</label>
                <div className="flex items-center gap-2">
                    <input 
                        type="range" 
                        min="9" max="18"
                        value={options.targetCredits}
                        onChange={(e) => setOptions({...options, targetCredits: Number(e.target.value)})}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <span className="text-sm font-bold text-purple-600 w-8 text-right">{options.targetCredits}</span>
                </div>
            </div>

            {/* 공강 요일 */}
            <div className="mb-4">
                <label className="block text-xs font-bold text-gray-500 mb-2">공강 희망 요일</label>
                <div className="flex gap-2 justify-center items-center">
                    {DAYS.map(day => (
                        <button
                            key={day}
                            onClick={() => toggleFreeDay(day)}
                            className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                                options.freeDays.includes(day) 
                                ? 'bg-purple-600 text-white shadow-md scale-110' 
                                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                            }`}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </div>

            {/* 교양 영역 */}
            <div className="mb-6">
                <label className="block text-xs font-bold text-gray-500 mb-2">선호 교양 영역</label>
                <div className="flex flex-wrap gap-2 justify-center items-center">
                    {GE_CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => toggleCategory(cat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                                options.geCategories.includes(cat)
                                ? 'bg-purple-50 border-purple-200 text-purple-700'
                                : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <button 
                onClick={() => onGenerate(options)}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-base font-bold shadow-lg shadow-purple-200 transition-all active:scale-95"
            >
                시간표 자동 완성하기
            </button>
        </div>
    );
}