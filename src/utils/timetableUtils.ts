import type { Lecture, Schedule, DayOfWeek } from '../types/timetable';
import { PERIOD_MAP } from '../constants/timetable';

// api를 표시하기 위한 전처리 작업(Lecture -> Schedule)
export const parseLecturesToSchedules = (lectures: Array<Lecture>): Schedule[] => {
    const schedules: Array<Schedule> = [];
    if (!lectures) return [];

    const uniqueCheck = new Set<string>();

    /**
     * 사용자가 직접 입력한 강의는 userLectureId가 있음 -> 그대로 사용
     * 자동 생성된 강의는 userLectureId 대신 lectureId가 있음 -> lectureId 사용
     */
    lectures.forEach((lecture) => {
        const uniqueKey = lecture.userLectureId
            ? `user-${lecture.userLectureId}`
            : `auto-${lecture.lectureId}`;

        if (uniqueCheck.has(uniqueKey)) {
            return;
        }
        uniqueCheck.add(uniqueKey);

        const match = lecture.dayPeriod.match(/([가-힣])([0-9.]+)/);

        if (match) {
            const dayStr = match[1];
            const periodsStr = match[2];
            
            if (!['월', '화', '수', '목', '금'].includes(dayStr)) return;
            const day = dayStr as DayOfWeek;
            const periods = periodsStr.split('.');

            let minStart = 24;
            let maxEnd = 0;
            let isValid = false;

            periods.forEach((p) => {
                const range = PERIOD_MAP[p];
                if (range) {
                    if (range.start < minStart) minStart = range.start;
                    if (range.end > maxEnd) maxEnd = range.end;
                    isValid = true;
                }
            });

            if (isValid) {
                schedules.push({
                    id: lecture.itemId,
                    day: day,
                    startTime: minStart,
                    endTime: maxEnd,
                    name: lecture.name,
                    location: lecture.classroom,
                });
            }
        }
    });

    // console.log(schedules.length)
    return schedules;
};

// 중복 제거
export const removeDuplicate = (lectures: Array<Lecture>): Array<Lecture> => {
    if (!lectures || lectures.length === 0) return [];

    const uniqueMap = new Map<string, Lecture>();

    lectures.forEach((lecture) => {
        const uniqueKey = lecture.userLectureId 
            ? `user-${lecture.userLectureId}` 
            : `school-${lecture.lectureId}-${lecture.dayPeriod}`;

        if (!uniqueMap.has(uniqueKey)) {
            uniqueMap.set(uniqueKey, lecture);
        }
    });

    return Array.from(uniqueMap.values());
};
