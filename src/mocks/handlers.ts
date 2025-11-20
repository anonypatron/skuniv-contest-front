import { http, HttpResponse } from 'msw';

// 테스트용 데이터
const mockData = {
    "timetableId": 31,
    "year": 2025,
    "semester": 2,
    "totalCredits": 18,
    "lectures": [
        {
            "itemId": 369,
            "lectureId": 481,
            "userLectureId": null,
            "fixed": false,
            "code": "GE1254",
            "name": "미래사회와평생교육",
            "professor": "김숙이",
            "dayPeriod": "월21.22",
            "classroom": "혜-409",
            "geCategory": "인문과예술",
            "credit": 3
        },
        {
            "itemId": 371,
            "lectureId": 472,
            "userLectureId": null,
            "fixed": false,
            "code": "GE1011",
            "name": "역사의이해",
            "professor": "박지현",
            "dayPeriod": "월23.24",
            "classroom": "혜-307",
            "geCategory": "인문과예술",
            "credit": 3
        },
        {
            "itemId": 373,
            "lectureId": 496,
            "userLectureId": null,
            "fixed": false,
            "code": "GE4107",
            "name": "미술의이해",
            "professor": "최기호",
            "dayPeriod": "수25.26",
            "classroom": "혜-311",
            "geCategory": "인문과예술",
            "credit": 3
        },
        {
            "itemId": 375,
            "lectureId": 478,
            "userLectureId": null,
            "fixed": false,
            "code": "GE1206",
            "name": "예술과상상력",
            "professor": "장지연",
            "dayPeriod": "화23.24",
            "classroom": "혜-408",
            "geCategory": "인문과예술",
            "credit": 3
        },
        {
            "itemId": 377,
            "lectureId": 474,
            "userLectureId": null,
            "fixed": false,
            "code": "GE1032",
            "name": "동양고전의이해",
            "professor": "신영미",
            "dayPeriod": "목23.24",
            "classroom": "혜-511",
            "geCategory": "인문과예술",
            "credit": 3
        },
        {
            "itemId": 379,
            "lectureId": 483,
            "userLectureId": null,
            "fixed": false,
            "code": "GE1312",
            "name": "세계뮤지컬의이해",
            "professor": "김형은",
            "dayPeriod": "수1.2",
            "classroom": "혜-511",
            "geCategory": "인문과예술",
            "credit": 3
        },
    ],
};

export const handlers = [
    http.get('http://localhost:8080/api/timetables/my?year=2025&semester=2', () => {
        return HttpResponse.json({
            mockData
        });
    }),

    // http.post('http://localhost:8080/api/timetables/year=2025&semester=2/custom-lectures', () => {

    // }),
];
