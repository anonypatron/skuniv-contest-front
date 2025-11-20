// 시간표 수동 추가를 위한 폼
export interface ManualForm {
    year: number;
    semester: number;
    name: string;
    dayPeriod: string;
    credit: number;
    code: string | null;
}

// 시간표 자동완성을 위한 옵션
export interface AutoOptions {
    year: number;
    semester: number;
    targetCredits: number;
    geCategories: Array<string>;
    freeDays: Array<string>;
}
