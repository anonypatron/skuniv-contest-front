import { api } from "../utils/axiosInstance";

import type { TimeTableDto } from "../types/timetable";
import type { AutoOptions, ManualForm } from "../types/createTimetable";

interface TimeTableProps {
    year: number;
    semester: number;
}

export const fetchCurrentTimetable = async ({ year, semester}: TimeTableProps): Promise<TimeTableDto> => {
    try {
        const res = await api.get(`/api/timetables/my?year=${year}&semester=${semester}`);
        return res.data;
    } catch (err: any) {
        console.error(err);
        throw new Error('Timetable fetch error');
    }
};

export const addCustomLecture = async (year: number, semester: number, form: ManualForm): Promise<TimeTableDto> => {
    try {
        const res = await api.post(`/api/timetables/${year}/${semester}/custom-lectures`, form);
        console.log(res.data);
        return res.data;
    } catch (err: any) {
        console.error(err);
        throw new Error('Failed to addCustomLecture');
    }
};

export const autoGenerate = async (options: AutoOptions): Promise<TimeTableDto> => {
    try {
        const res = await api.post('/api/timetables/auto-generate', options);
        return res.data;
    } catch (err: any) {
        console.error(err);
        throw new Error('Failed to autoGenerate');
    }
};

export const deleteUserLecture = async (userLectureId: number) => {
    try {
        await api.delete(`/api/timetables/user-lectures/${userLectureId}`);
    } catch (err: any) {
        console.error(err);
        throw new Error('Failed to deleteUserLecture');
    }
};

export const deleteLectureByName = async (year: number, semester: number, name: string) => {
    try {
        await api.delete(`/api/timetables/${year}/${semester}/lectures/by-name?name=${name}`);
    } catch (err: any) {
        console.error(err);
        throw new Error('Failed to deleteUserLecture');
    }
};

export const deleteTimetable = async (year: number, semester: number) => {
    try {
        await api.delete(`/api/timetables/${year}/${semester}`);
    } catch (err: any) {
        console.error(err);
        throw new Error('Failed to deleteTimetable');
    }
};