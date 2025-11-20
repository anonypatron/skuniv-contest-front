import { useState } from "react";
import { Link } from "react-router-dom";
import Timetable from '../components/TimeTable';

import { LoadingSpinner } from "../components/LoadingSpinner";
import { useLogout } from "../hooks/auth/useLogout";
import { useDeleteTimetable, useTimetableQuery } from "../hooks/timetable/useTimetableQueries";
import { notify } from "../components/notifications/NotificationProvider";
import SkunivIcon from '../assets/icons/skuniv_icon.svg';

export default function Home() {
    const [year, setYear] = useState<number>(2025);
    const [semester, setSemester] = useState<number>(2);

    const { data: timetableData, isPending, isError, error } = useTimetableQuery({ year, semester });
    const deleteTimetable = useDeleteTimetable(year, semester);
    const logout = useLogout();

    const handleDeleteTimetable = async () => {
        if (!window.confirm(`${year}년 ${semester}학기 시간표를 정말 삭제하시겠습니까?`)) {
            return;
        }

        deleteTimetable.mutate(undefined, {
            onSuccess: () => {
                notify.error('시간표가 삭제되었습니다.');
            },
            onError: (err: any) => {
                console.error(err);
            }
        });
    };

    if (isPending) {
        return <LoadingSpinner text="데이터를 로드하는 중..."/>
    }

    if (isError) {
        console.error(error);
    }

    const lectures = timetableData?.lectures;

    return (
        <div className="min-h-screen bg-gray-50/50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-5xl space-y-6">
                <div className="flex justify-between items-end pb-2 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <img src={SkunivIcon} width={50} height={50}/>
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                            나의 시간표
                        </h1>
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
                            onChange={(e) => setYear(Number(e.target.value))}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-32 p-2.5"
                        >
                            <option value="2025">2025학년도</option>
                            <option value="2024">2024학년도</option>
                        </select>
                        <select 
                            value={semester}
                            onChange={(e) => setSemester(Number(e.target.value))}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-28 p-2.5"
                        >
                            <option value="1">1학기</option>
                            <option value="2">2학기</option>
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleDeleteTimetable}
                            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 focus:ring-4 focus:ring-red-100 transition-all shadow-sm"
                        >
                            시간표 삭제
                        </button>

                        <Link 
                            to="/create-timetable"
                            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition-all shadow-sm hover:shadow-md"
                        >
                            시간표 생성하기
                        </Link>
                    </div>
                </div>

                <Timetable lectures={lectures || []} />
            </div>
        </div>
    );
}
