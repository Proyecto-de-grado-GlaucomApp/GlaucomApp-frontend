import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getExams } from "../../services/examsApi";
import { mapApiExams } from "../../utils/mappers/examMapperApi";
import LoadingIndicator from "../../components/shared/LoadingIndicator";
import { deletePatient } from "../../services/patientsApi"; // Asegúrate de que la ruta sea correcta

const PatientDetailScreen = ({ route, navigation }) => {
    const { patientId, patientName, patientCedula } = route.params;
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const [hasMoreExams, setHasMoreExams] = useState(true);
    const batchSize = 6;

    const fetchExams = async () => {
        if (!hasMoreExams) return;
        setLoadingMore(true);
        try {
            const response = await getExams(startIndex, startIndex + batchSize, patientId);
            const mappedExams = mapApiExams(response);
            if (mappedExams.exams.length < batchSize) {
                setHasMoreExams(false);
            }
            setExams(prevExams => [...prevExams, ...mappedExams.exams]);
            setStartIndex(prevIndex => prevIndex + batchSize);
        } catch (error) {
            console.error('Error fetching exams:', error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        setExams([]);
        setStartIndex(0);
        setLoading(true);
        setHasMoreExams(true);
        fetchExams();
    }, [patientId]);

    const handleImagePress = (examId) => {
        console.log('Exam ID:', examId, 'Patient ID:', patientId);
        navigation.navigate('PatientExam', { examId, patientId });
    };

    const handleLoadMore = () => {
        if (!loadingMore && hasMoreExams) {
            fetchExams();
        }
    };

    const confirmDelete = () => {
        Alert.alert(
            "Confirmar eliminación",
            "¿Estás seguro de que deseas borrar este paciente?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sí, borrar",
                    onPress: async () => {
                        try {
                            await deletePatient(patientId); // Llama a la función de eliminación
                            Alert.alert("Éxito", "Paciente eliminado correctamente.");
                            navigation.goBack(); // Regresa a la pantalla anterior
                        } catch (error) {
                            console.error('Error deleting patient:', error);
                            Alert.alert("Error", "No se pudo eliminar el paciente.");
                        }
                    }
                }
            ]
        );
    };

    const renderImageItem = ({ item }) => (
        <TouchableOpacity style={styles.imageContainer} onPress={() => handleImagePress(item.examId)}>
            <Image source={{ uri: item.urlImage }} style={styles.image} />
            <View style={styles.imageTextContainer}>
                <Text style={styles.imageName}>{item.name}</Text>
                <Text style={styles.imageDate}>{item.date}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>{patientName}</Text>
                    <Text style={styles.subtitle}>C.C: {patientCedula}</Text>
                </View>
                <TouchableOpacity onPress={confirmDelete} style={styles.deleteIcon}>
                    <Icon name="delete-outline" size={28} color="#769BCE" />
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : exams.length > 0 ? (
                <FlatList
                    data={exams}
                    keyExtractor={item => item.examId.toString()}
                    renderItem={renderImageItem}
                    contentContainerStyle={styles.listContainer}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={loadingMore ? <LoadingIndicator message="Cargando exámenes..." /> : null}
                />
            ) : (
                <Text>No hay exámenes disponibles</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
    },
    deleteIcon: {
        padding: 8,
    },
    imageContainer: {
        flexBasis: '50%',
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    image: {
        width: '100%',
        height: 150,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    imageTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    imageName: {
        fontSize: 14,
        fontWeight: 'bold',
        flex: 1,
    },
    imageDate: {
        fontSize: 12,
        color: '#666',
        textAlign: 'right',
    },
    listContainer: {
        paddingBottom: 16,
    },
});

export default PatientDetailScreen;
