import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import showErrorMessage from "../utils/messages/errorMessages";
import {format} from 'date-fns';
import {Alert} from "react-native";
import {refreshTokenAccount} from "./accountApi";

export async function getExams(startIndex = 0, endIndex = 30, pacientId) {
    try {

        //await refreshTokenAccount();

        const apiUrl = process.env.API_URL + `/mobile/clinical_history/get/exams?startIndex=${startIndex}&endIndex=${endIndex}&pacientId=${pacientId}`;
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

    //await refreshTokenAccount();

    console.log('pacientId', pacientId);

    try {
        const apiUrl = process.env.API_URL + `/mobile/clinical_history/get/exam?examId=${examId}&pacientId=${pacientId}`;
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

        //await refreshTokenAccount();

        const apiUrl = process.env.API_URL + `/mobile/clinical_history/delete/exam/${examId}?pacientId=${pacientId}`;
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

        const response = await axios.delete(apiUrl, {headers});
        console.log('Deleted Exam:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting exam:', error);
        showErrorMessage(error);
        throw error;
    }
}




export const saveExam = async ({
                                   cedula,
                                   name,
                                   urlImage,
                                   distanceRatio,
                                   perimeterRatio,
                                   areaRatio,
                                   neuroretinalRimPerimeter,
                                   neuroretinalRimArea,
                                   excavationPerimeter,
                                   excavationArea,
                                   state,
                                   ddlStage
                               }) => {
    const date = format(new Date(), "yyyy-MM-dd");

    const examenData = {
        cedula,
        name,
        date,
        urlImage,
        distanceRatio,
        perimeterRatio,
        areaRatio,
        neuroretinalRimPerimeter,
        neuroretinalRimArea,
        excavationPerimeter,
        excavationArea,
        state,
        ddlStage
    };

    //await refreshTokenAccount();

    const token = await AsyncStorage.getItem('token');
    if (!token) {
        throw new Error('No token found. Please log in again.');
    }

    try {
        const response = await fetch(process.env.API_URL + "/mobile/clinical_history/save/exam", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(examenData)
        });

        // Leer la respuesta como texto
        const responseBody = await response.text();
        console.log("Respuesta cruda de la API:", responseBody);


        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error('Error al guardar el examen');
        }

        // Devolver la respuesta cruda
        return responseBody; // Puedes modificar esto si decides cambiar la respuesta del servidor
    } catch (error) {
        console.error("Error en guardarExamen:", error);
        throw error; // Propagar el error para manejo posterior
    }
};

