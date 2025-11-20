import { useState } from "react";
import { notify } from "./notifications/NotificationProvider";

import type { ManualForm } from "../types/createTimetable";

interface Props {
    year: number;
    semester: number;
    onSubmit: (data: ManualForm) => void;
}

export default function ManualEntryForm({ year, semester, onSubmit }: Props) {
    const [form, setForm] = useState<ManualForm>({
        year: year,
        semester: semester,
        name: '',
        dayPeriod: '',
        credit: 3,
        code: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'credit') {
            let numVal = Number(value);
            if (value === '') {
                setForm(prev => ({ ...prev, [name]: '' as any }));
                return;
            }
            if (numVal > 3) numVal = 3;
            if (numVal < 1) numVal = 1;
            setForm(prev => ({ ...prev, [name]: numVal }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.dayPeriod) return notify.info("강의명과 시간을 입력해주세요.");
        
        onSubmit(form);
        setForm({
            year: year,
            semester: semester,
            name: '', 
            dayPeriod: '', 
            credit: 3, 
            code: null,
        });
    };

    return (
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">STEP 1</span>
                직접 강의 추가
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">강의명</label>
                    <input 
                        name="name" 
                        value={form.name} 
                        onChange={handleChange} 
                        placeholder="예: 자료구조"
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <div className="flex gap-2">
                    <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-500 mb-1">시간</label>
                        <input 
                            name="dayPeriod" 
                            value={form.dayPeriod} 
                            onChange={handleChange} 
                            placeholder="예: 월1.2"
                            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div className="w-20">
                        <label className="block text-xs font-medium text-gray-500 mb-1">학점(1~3)</label>
                        <input 
                            type="number" 
                            name="credit" 
                            min={1} max={3}
                            value={form.credit} 
                            onChange={handleChange} 
                            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>
                </div>
                <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition">
                    + 추가하기
                </button>
            </form>
        </div>
    );
}