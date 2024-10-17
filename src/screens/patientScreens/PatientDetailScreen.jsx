import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';

const PatientDetailScreen = ({ route, navigation }) => {
    const { patient } = route.params;

    // Función para manejar la selección de una imagen
    const handleImagePress = (image) => {
        console.log('Imagen seleccionada:', image);
        // Ejemplo de navegación a otra pantalla:
        // navigation.navigate('ImageDetailScreen', { image });
    };

    const renderImageItem = ({ item }) => (
        <TouchableOpacity style={styles.imageContainer} onPress={() => handleImagePress(item)}>
            <Image source={{ uri: item.url }} style={styles.image} />
            <View style={styles.imageTextContainer}>
                <Text style={styles.imageName}>{item.name}</Text>
                <Text style={styles.imageDate}>{item.date}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{patient.name}</Text>
            <Text style={styles.subtitle}>C.C: {patient.cedula}</Text>

            {patient.images.length > 0 ? (
                <FlatList
                    data={patient.images}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderImageItem}
                    contentContainerStyle={styles.listContainer}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <Text>No hay imágenes disponibles</Text>
            )}
        </View>
    );
}

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
        flexBasis: '50%', // Ocupa exactamente la mitad del ancho del contenedor padre
        marginBottom: 16,
        paddingHorizontal: 8, // Espacio horizontal entre las columnas
    },
    image: {
        width: '100%', // Asegura que la imagen ocupe
        height: 150, // Ajusta la altura según sea necesario
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10, // Borde redondeado
    },
    imageTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Nombre a la izquierda y fecha a la derecha
        marginTop: 5,
    },
    imageName: {
        fontSize: 14,
        fontWeight: 'bold',
        flex: 1, // Asegura que el nombre ocupe el espacio disponible
    },
    imageDate: {
        fontSize: 12,
        color: '#666',
        textAlign: 'right', // Alinea la fecha a la derecha
    },
    listContainer: {
        paddingBottom: 20,
    },
});

export default PatientDetailScreen;
