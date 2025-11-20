import Timetable from "./TimeTable";

import type { Lecture } from "../types/timetable";

interface Props {
    year: number;
    semester: number;
    lectures: Lecture[];
    isGenerated: boolean;
    onSave: () => void;
}

export default function TimetablePreview({ year, semester, lectures, isGenerated, onSave }: Props) {
    const totalCredits = lectures.reduce((acc, cur) => acc + (cur.credit || 0), 0);

    return (
        <div className="flex flex-col space-y-6">
            <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
                    <h3 className="font-bold text-gray-700">
                        📅 {year}학년도 {semester}학기 미리보기
                    </h3>
                    <div className="px-3 py-1 bg-white rounded-md border border-gray-200 text-xs text-gray-500">
                        총 {totalCredits} 학점
                    </div>
                </div>
                <div className="p-4">
                    <Timetable lectures={lectures} />
                </div>
            </div>

            {isGenerated && (
                <div className="flex justify-end animate-fadeIn">
                    <button 
                        onClick={onSave}
                        className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-bold rounded-xl shadow-lg shadow-green-200 transition-transform hover:-translate-y-1"
                    >
                        ✅ 이 시간표로 저장하기
                    </button>
                </div>
            )}
        </div>
    );
}
