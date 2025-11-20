import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AutoGenerateForm from '../components/AutoGenerateForm';
import LectureList from '../components/LectureList';
import ManualEntryForm from '../components/ManualEntryForm';
import TimetablePreview from '../components/TablePreview';
import TimetableHeader from '../components/TimetableHeader';
import { removeDuplicate } from '../utils/timetableUtils';
import { notify } from "../components/notifications/NotificationProvider";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { 
    useAddLectureMutation, 
    useAutoGenerateMutation, 
    useDeleteLectureByName, 
    useDeleteUserLecture, 
    useTimetableQuery 
} from "../hooks/timetable/useTimetableQueries";

import type { AutoOptions, ManualForm } from '../types/createTimetable';
import type { Lecture } from "../types/timetable";

/* -------------------------------------------------------------------------------------------
mock api

 ------------------------------------------------------------------------------------------- */
export default function CreateTimetable() {
    const navigate = useNavigate();
    
    const [year, setYear] = useState<number>(2025);
    const [semester, setSemester] = useState<number>(2);
    const [currentLectures, setCurrentLectures] = useState<Array<Lecture>>([]);
    const [isGenerated, setIsGenerated] = useState<boolean>(false);

    const { data: timetable, isPending, isError, error } = useTimetableQuery({ year, semester });
    const addLectureMutation = useAddLectureMutation(year, semester);
    const AutoGenerateMutation = useAutoGenerateMutation();
    const deleteUserLectureMutation = useDeleteUserLecture(year, semester);
    const deleteByNameMutation = useDeleteLectureByName(year, semester);

    useEffect(() => {
        if (timetable?.lectures) {
            setCurrentLectures(removeDuplicate(timetable.lectures));
            setIsGenerated(false);
        }
        if (isError) {
            setCurrentLectures([]);
            console.error(error);
        }
    }, [timetable]);

    // 수동 강의 추가
    const handleAddManual = (formData: ManualForm) => {
        addLectureMutation.mutate(formData, {
            onSuccess: (data) => {
                setCurrentLectures(removeDuplicate(data.lectures));
                setIsGenerated(false);
            },
            onError: (err: any) => {
                console.error(err);
                notify.error('강의 추가 실패');
            }
        })
    };

    // 자동 생성
    const handleAutoGenerate = (options: AutoOptions) => {
        AutoGenerateMutation.mutate(options, {
            onSuccess: (data) => {
                setCurrentLectures(removeDuplicate(data.lectures));
                setIsGenerated(true);
            },
            onError: (err: any) => {
                console.error(err);
                notify.error('자동 생성 실패');
            }
        })
    };

    // 사용자 강의 삭제
    const handleDeleteUserLecture = (userLectureId: number) => {
        deleteUserLectureMutation.mutate(userLectureId, {
            onSuccess: () => {},
            onError: (err: any) => {
                console.error(err);
                notify.error('강의 삭제 실패');
            }
        });
    };

    // 강의명으로 삭제
    const handleDeleteLectureByName = (name: string) => {
        deleteByNameMutation.mutate(name, {
            onSuccess: () => {},
            onError: (err: any) => {
                console.error(err);
                notify.error('강의 삭제 실패');
            }
        });
    };

    const handleChangeYear = (year: number) => {
        setYear(year);
        setIsGenerated(false);
    };

    const handleChangeSemester = (semester: number) => {
        setSemester(semester);
        setIsGenerated(false);
    };

    // if (isPending) {
    //     return <LoadingSpinner text="데이터를 불러오는 중..."/>
    // }

    return (
        <div className="min-h-screen bg-gray-50/50 flex flex-col items-center py-8 px-4">
            {/* 헤더 */}
            <TimetableHeader 
                year={year} 
                semester={semester} 
                onChangeYear={handleChangeYear} 
                onChangeSemester={handleChangeSemester} 
                onBack={() => navigate('/home')} 
            />

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* 왼쪽 */}
                <div className="lg:col-span-4 space-y-6">
                    <ManualEntryForm 
                        year={year}
                        semester={semester}
                        onSubmit={handleAddManual} 
                    />
                    <AutoGenerateForm 
                        year={year}
                        semester={semester}
                        onGenerate={handleAutoGenerate}
                    />
                </div>

                {/* 오른쪽 */}
                <div className="lg:col-span-8 space-y-6">
                    <TimetablePreview 
                        year={year} 
                        semester={semester} 
                        lectures={currentLectures} 
                        isGenerated={isGenerated} 
                        onSave={() => navigate('/home')} 
                    />
                    
                    <LectureList 
                        lectures={currentLectures}
                        onDeleteUserLecture={handleDeleteUserLecture}
                        onDeleteLectureByName={handleDeleteLectureByName}
                    />
                </div>
            </div>
        </div>
    );
}
