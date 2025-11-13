export type DayOfWeek = '월' | '화' | '수' | '목' | '금';

export interface Schedule {
    id: number;
    day: DayOfWeek;
    startTime: number;
    endTime: number;
    name: string;
    location?: string;
    professor?: string;
}