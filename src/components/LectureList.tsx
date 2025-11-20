import type { Lecture } from "../types/timetable";

interface Props {
    lectures: Lecture[];
    onDeleteUserLecture: (id: number) => void;
    onDeleteLectureByName: (name: string) => void;
}

export default function LectureList({ lectures, onDeleteUserLecture, onDeleteLectureByName }: Props) {
    if (lectures.length === 0) {
        return (
            <div className="bg-white p-5 mb-5 rounded-xl shadow-sm border border-gray-200 text-center">
                 <p className="text-sm text-gray-400 py-4">등록된 강의가 없습니다.</p>
            </div>
        );
    }

    // console.log(lectures);

    return (
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                📋 현재 등록된 강의 목록
            </h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 bg-gray-50 uppercase border-b border-gray-100">
                        <tr>
                            <th className="px-4 py-3">강의명</th>
                            <th className="px-4 py-3">시간</th>
                            <th className="px-4 py-3">학점</th>
                            <th className="px-4 py-3 text-center">관리</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {lectures.map((lecture) => (
                            <tr key={lecture.itemId} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-900">{lecture.name}</td>
                                <td className="px-4 py-3 text-gray-600">{lecture.dayPeriod}</td>
                                <td className="px-4 py-3 text-gray-600">{lecture.credit}</td>
                                <td className="px-4 py-3 text-center">
                                    {lecture.userLectureId ? (
                                        <button
                                            onClick={() => onDeleteUserLecture(lecture.userLectureId!)}
                                            className="text-xs text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 px-2.5 py-1.5 rounded transition-colors"
                                        >
                                            삭제
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => onDeleteLectureByName(lecture.name)}
                                            className="text-xs text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 px-2.5 py-1.5 rounded transition-colors"
                                        >
                                            삭제
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}