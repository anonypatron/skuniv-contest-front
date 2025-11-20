import SkunivIcon from '../assets/icons/skuniv_icon.svg';

interface Props {
    year: number;
    semester: number;
    onChangeYear: (year: number) => void;
    onChangeSemester: (semester: number) => void;
    onBack: () => void;
}

export default function TimetableHeader({ year, semester, onChangeYear, onChangeSemester, onBack }: Props) {
    return (
        <div className="w-full max-w-6xl mb-6 border-b border-gray-200 pb-4">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                    <img src={SkunivIcon} width={50} height={50}/>
                    <h1 className="text-2xl font-bold text-gray-900">시간표 생성기</h1>
                </div>
                <button onClick={onBack} className="text-gray-500 hover:text-gray-700 underline text-sm">
                    홈으로 돌아가기
                </button>
            </div>

            <div className="flex gap-3 items-center bg-white p-3 rounded-lg border border-gray-200 w-fit">
                <label className="text-sm font-bold text-gray-600">학기 선택 :</label>
                <select 
                    value={year} 
                    onChange={(e) => onChangeYear(Number(e.target.value))}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-1.5"
                >
                    <option value={2025}>2025년</option>
                    <option value={2024}>2024년</option>
                </select>
                <select 
                    value={semester} 
                    onChange={(e) => onChangeSemester(Number(e.target.value))}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-1.5"
                >
                    <option value={1}>1학기</option>
                    <option value={2}>2학기</option>
                </select>
            </div>
        </div>
    );
}