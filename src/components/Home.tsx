import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TimeTable from '../components/TimeTable';

import { useLogout } from "../hooks/auth/useLogout";
import type { Schedule } from "../types/schedule";

export default function Home() {
    const logout = useLogout();

    const [year, setYear] = useState<string>('2024');
    const [semester, setSemester] = useState<string>('1');
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    
    useEffect(() => {
        const mockData: Schedule[] = [
            { id: 1, day: '월', startTime: 9, endTime: 10.5, name: '자료구조', location: '공학관 301호' },
            { id: 2, day: '월', startTime: 13, endTime: 14, name: '대학영어', location: '어학관 102호' },
            { id: 3, day: '화', startTime: 10, endTime: 12, name: '운영체제', location: '정보관 404호' },
            { id: 4, day: '수', startTime: 9, endTime: 11, name: '자료구조', location: '공학관 301호' },
            { id: 5, day: '수', startTime: 14, endTime: 16, name: '데이터베이스', location: '정보관 201호' },
            { id: 6, day: '목', startTime: 11, endTime: 13, name: '컴퓨터네트워크', location: '공학관 505호' },
            { id: 7, day: '금', startTime: 15, endTime: 18, name: '캡스톤디자인', location: '산학협력관' },
        ];
        setSchedules(mockData);
    }, [year, semester]);

    return (
        <div className="min-h-screen bg-green-50/50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-5xl space-y-6">
                <div className="flex justify-between items-end pb-2 border-b border-gray-200">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                            나의 시간표
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">이번 학기도 파이팅!</p>
                    </div>
                    <button 
                        onClick={logout}
                        className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
                    >
                        로그아웃
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex gap-3">
                        <select 
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-32 p-2.5"
                        >
                            <option value="2024">2024학년도</option>
                            <option value="2025">2025학년도</option>
                        </select>
                        <select 
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-28 p-2.5"
                        >
                            <option value="1">1학기</option>
                            <option value="2">2학기</option>
                        </select>
                    </div>

                    <Link 
                        to="/create-timetable"
                        className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition-all shadow-sm hover:shadow-md"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        시간표 생성하기
                    </Link>
                </div>

                <TimeTable schedules={schedules} />
            </div>
        </div>
    );
}
