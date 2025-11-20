
export const DAYS = ['월', '화', '수', '목', '금'] as const;
export const START_HOUR = 9;
export const END_HOUR = 18;
export const HOUR_HEIGHT = 64; // px

export const PERIOD_DURATION_50 = 50 / 60;
export const PERIOD_MAP: Record<string, { start: number; end: number }> = {
    // 50분 수업
    '1': { start: 9, end: 9 + PERIOD_DURATION_50 },
    '2': { start: 10, end: 10 + PERIOD_DURATION_50 },
    '3': { start: 11, end: 11 + PERIOD_DURATION_50 },
    '4': { start: 12, end: 12 + PERIOD_DURATION_50 },
    '5': { start: 13, end: 13 + PERIOD_DURATION_50 },
    '6': { start: 14, end: 14 + PERIOD_DURATION_50 },
    '7': { start: 15, end: 15 + PERIOD_DURATION_50 },
    '8': { start: 16, end: 16 + PERIOD_DURATION_50 },
    '9': { start: 17, end: 17 + PERIOD_DURATION_50 },

    // 75분 수업
    '21': { start: 9, end: 10.25 },      // 09:00 ~ 10:15
    '22': { start: 10.5, end: 11.75 },   // 10:30 ~ 11:45
    '23': { start: 12, end: 13.25 },     // 12:00 ~ 13:15
    '24': { start: 13.5, end: 14.75 },   // 13:30 ~ 14:45
    '25': { start: 15, end: 16.25 },     // 15:00 ~ 16:15
    '26': { start: 16.5, end: 17.75 },   // 16:30 ~ 17:45
};

export const LECTURE_COLORS = [
    'bg-blue-100 text-blue-700 border-blue-200',
    'bg-yellow-100 text-yellow-700 border-yellow-200',
    'bg-pink-100 text-pink-700 border-pink-200',
    'bg-purple-100 text-purple-700 border-purple-200',
    'bg-green-100 text-green-700 border-green-200',
    'bg-indigo-100 text-indigo-700 border-indigo-200',
    'bg-orange-100 text-orange-700 border-orange-200',
    'bg-teal-100 text-teal-700 border-teal-200',
];
