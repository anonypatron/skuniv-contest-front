import { useMemo } from "react";
import { DAYS, END_HOUR, HOUR_HEIGHT, LECTURE_COLORS, START_HOUR } from '../constants/timetable.ts';
import type { Lecture } from "../types/timetable";
import { parseLecturesToSchedules } from "../utils/timetableUtils";

interface TimetableProps {
    lectures: Lecture[];
}

export default function Timetable({ lectures }: TimetableProps) {
    const schedules = useMemo(() => parseLecturesToSchedules(lectures), [lectures]);

    const colorMap = useMemo(() => {
        const uniqueLectures = Array.from(new Set(schedules.map(s => s.name)));
        const map = new Map<string, string>();
        uniqueLectures.forEach((lectureName, index) => {
            map.set(lectureName, LECTURE_COLORS[index % LECTURE_COLORS.length]);
        });
        return map;
    }, [schedules]);

    const getPositionStyle = (startTime: number, endTime: number) => {
        const top = (startTime - START_HOUR) * HOUR_HEIGHT;
        const height = (endTime - startTime) * HOUR_HEIGHT;
        return { top: `${top}px`, height: `${height}px` };
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden select-none w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-6 bg-gray-50 border-b border-gray-200">
                <div className="py-3 text-center text-xs font-bold text-gray-400">TIME</div>
                {DAYS.map((day) => (
                    <div key={day} className="py-3 text-center text-sm font-bold text-gray-700">{day}</div>
                ))}
            </div>

            <div className="relative" style={{ height: `${(END_HOUR - START_HOUR) * HOUR_HEIGHT}px` }}>
                {Array.from({ length: END_HOUR - START_HOUR }).map((_, i) => {
                    const time = START_HOUR + i;
                    return (
                        <div key={time} className="absolute w-full border-b border-gray-100 text-xs text-gray-400 pl-2"
                             style={{ top: `${i * HOUR_HEIGHT}px`, height: `${HOUR_HEIGHT}px` }}>
                            <span className="block -mt-2.5 bg-white w-fit pr-1 relative z-10 font-semibold">{time}:00</span>
                        </div>
                    );
                })}

                {/* 세로선 */}
                <div className="absolute inset-0 grid grid-cols-6 w-full h-full pointer-events-none">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={`col-line-${i}`} className="border-r border-gray-100 h-full" />
                    ))}
                </div>

                {/* 강의 블록 */}
                <div className="absolute inset-0 grid grid-cols-6 w-full h-full">
                    <div className="col-span-1"></div>
                    <div className="col-span-5 flex w-full h-full">
                        {DAYS.map((day) => (
                            <div key={day} className="flex-1 relative w-full h-full">
                                {schedules
                                    .filter((s) => s.day === day)
                                    .map((schedule) => {
                                        // console.log(schedule.id);
                                        const style = getPositionStyle(schedule.startTime, schedule.endTime);
                                        const colorClass = colorMap.get(schedule.name);

                                        return (
                                            <div
                                                key={schedule.id}
                                                style={style}
                                                className={`
                                                    absolute inset-x-0 m-1 rounded-md p-1 shadow-sm 
                                                    flex flex-col justify-center items-center text-center 
                                                    cursor-pointer transition-transform hover:scale-[1.02] hover:z-20
                                                    ${colorClass}
                                                `}
                                                title={`${schedule.name} (${schedule.startTime} ~ ${schedule.endTime})`}
                                            >
                                                <p className="text-xs font-bold leading-tight break-keep">{schedule.name}</p>
                                                {schedule.location && (
                                                    <p className="text-[10px] opacity-80 mt-0.5 font-medium">{schedule.location}</p>
                                                )}
                                            </div>
                                        );
                                    })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
