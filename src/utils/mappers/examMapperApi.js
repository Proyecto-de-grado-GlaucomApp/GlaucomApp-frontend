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

