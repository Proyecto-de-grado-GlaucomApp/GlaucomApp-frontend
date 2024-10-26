import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getExams } from "../../services/examsApi";
import { mapApiExams } from "../../utils/mappers/examMapperApi";
import LoadingIndicator from "../../components/shared/LoadingIndicator";

const PatientDetailScreen = ({ route, navigation }) => {
    const { patientId, patientName, patientCedula } = route.params;
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const [hasMoreExams, setHasMoreExams] = useState(true); // Estado para controlar si hay más exámenes
    const batchSize = 6;

    // Función para cargar exámenes
    const fetchExams = async () => {
        if (!hasMoreExams) return; // Evita cargar si no hay más exámenes

        setLoadingMore(true);
        try {
            const response = await getExams(startIndex, startIndex + batchSize, patientId);
            const mappedExams = mapApiExams(response);

            if (mappedExams.exams.length < batchSize) {
                setHasMoreExams(false); // No hay más exámenes por cargar
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

    const handleImagePress = (image) => {
        console.log('Imagen seleccionada:', image);
        // Ejemplo de navegación a otra pantalla:
        // navigation.navigate('ImageDetailScreen', { image });
    };

    const handleLoadMore = () => {
        if (!loadingMore && hasMoreExams) {
            fetchExams();
        }
    };

    const renderImageItem = ({ item }) => (
        <TouchableOpacity style={styles.imageContainer} onPress={() => handleImagePress(item)}>
            <Image source={{ uri: item.urlImage }} style={styles.image} />
            <View style={styles.imageTextContainer}>
                <Text style={styles.imageName}>{item.name}</Text>
                <Text style={styles.imageDate}>{item.date}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{patientName}</Text>
            <Text style={styles.subtitle}>C.C: {patientCedula}</Text>

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
                    ListFooterComponent={loadingMore ? <LoadingIndicator message="Cargando examenes..." /> : null}
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
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
