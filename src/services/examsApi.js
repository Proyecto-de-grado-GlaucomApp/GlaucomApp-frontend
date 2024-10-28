import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import showErrorMessage from "../utils/messages/errorMessages";

export async function getExams(startIndex = 0, endIndex = 15, pacientId) {
    try {
        const apiUrl = `http://192.168.1.3:8000/mobile/clinical_history/get/exams?startIndex=${startIndex}&endIndex=${endIndex}&pacientId=${pacientId}`;
        const token = await AsyncStorage.getItem('token');

        console.log('URL:', apiUrl);
        console.log('Token:', token);

        if (!token) {
            throw new Error('No token found. Please log in again.');
        }
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const response = await axios.get(apiUrl, {headers});
        console.log('Fetched Exams:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching Exams:', error);
        showErrorMessage(error);
        throw error;
    }
}


export async function getExamById(examId, pacientId) {
    try {
        const apiUrl = process.env.EXPO + `/mobile/clinical_history/get/exam?examId=${examId}&pacientId=${pacientId}`;
        const token = await AsyncStorage.getItem('token');

        console.log('URL:', apiUrl);
        console.log('Token:', token);

        if (!token) {
            throw new Error('No token found. Please log in again.');
        }
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const response = await axios.get(apiUrl, {headers});
        console.log('Fetched Exams:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching Exams:', error);
        showErrorMessage(error);
        throw error;
    }
}

export async function deleteExam(examId, pacientId) {
    try {
        const apiUrl = process.env.EXPO +`/mobile/clinical_history/delete/exam/${examId}?pacientId=${pacientId}`;
        const token = await AsyncStorage.getItem('token');

        console.log('URL:', apiUrl);
        console.log('Token:', token);

        if (!token) {
            throw new Error('No token found. Please log in again.');
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const response = await axios.delete(apiUrl, { headers });
        console.log('Deleted Exam:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting exam:', error);
        showErrorMessage(error);
        throw error;
    }
}


import { format } from 'date-fns';

export const saveExam = async ({ cedula, name, urlImage, distanceRatio, perimeterRatio, areaRatio }) => {
    const date = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"); // Fecha en formato ISO, ajustable según tu API

    const examenData = {
        cedula,
        name,
        date,
        urlImage,
        distanceRatio,
        perimeterRatio,
        areaRatio
    };

    try {
        const response = await fetch("http://192.168.1.3:8000/mobile/clinical_history/save/exam", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(examenData)
        });

        if (!response.ok) {
            throw new Error('Error al guardar el examen');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en guardarExamen:", error);
        throw error;
    }
};
