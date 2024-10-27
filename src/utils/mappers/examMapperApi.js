export const mapApiExams = (responseDataExams) => {
    if (!responseDataExams || !Array.isArray(responseDataExams)) {
        return {
            exams: [],
        };
    }

    return {
        exams: responseDataExams.map((exam) => ({
            examId: exam.examId,
            name: exam.name,
            date: exam.date,
            urlImage: exam.urlImage
        })),
    };
};


export const mapApiExamById = (responseDataExams) => {
    if (!responseDataExams) {
        return {
            examId: '',
            name: '',
            date: '',
            urlImage: '',
            distanceRatio: 0,
            perimeterRatio: 0,
            areaRatio: 0
        };
    }

    return {
        examId: responseDataExams.examId || '',
        name: responseDataExams.name || '',
        date: responseDataExams.date || '',
        urlImage: responseDataExams.urlImage || '',
        distanceRatio: responseDataExams.distanceRatio || 0,
        perimeterRatio: responseDataExams.perimeterRatio || 0,
        areaRatio: responseDataExams.areaRatio || 0
    };
};




