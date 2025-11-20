import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchCurrentTimetable, addCustomLecture, autoGenerate, deleteUserLecture, deleteLectureByName, deleteTimetable } from "../../api/timetableApi";

import type { ManualForm, AutoOptions } from "../../types/createTimetable";

interface TimeTableProps {
    year: number;
    semester: number;
}

export const useTimetableQuery = ({ year, semester }: TimeTableProps) => {
    return useQuery({
        queryKey: [year, semester],
        queryFn: () => fetchCurrentTimetable({ year, semester }),
        staleTime: 0,
    });
};

export const useAddLectureMutation = (year: number, semester: number) => {
    return useMutation({
        mutationFn: (form: ManualForm) => addCustomLecture(year, semester, form),
    });
};

export const useAutoGenerateMutation = () => {
    return useMutation({
        mutationFn: (options: AutoOptions) => autoGenerate(options),
    });
};

export const useDeleteUserLecture = (year: number, semester: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userLectureId: number) => deleteUserLecture(userLectureId),
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: [year, semester]
            });
        }
    });
};

export const useDeleteLectureByName = (year: number, semester: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (name: string) => deleteLectureByName(year, semester, name),
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: [year, semester]
            });
        },
    });
};

export const useDeleteTimetable = (year: number, semester: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteTimetable(year, semester),
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: [year, semester]
            });
        }
    });
};
