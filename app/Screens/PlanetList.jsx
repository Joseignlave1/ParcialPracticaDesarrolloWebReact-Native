import { useEffect, useState } from "react";
import { getPlanets, deletePlanet} from "../Services/api";
import { ScrollView, View, Text, TouchableOpacity, FlatList, Image,StyleSheet, Alert} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
const PlanetList = ({navigation}) => {
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        getPlanets().then((planet) => setPlanets(planet))
    }, [])


    useFocusEffect(() => {
      getPlanets();
    })
    
   
    const handleDelete = async (id) => {
        try {
            await deletePlanet(id); // Llama al servicio para borrar el planeta
            // Filtra el estado para eliminar el planeta localmente
            setPlanets((prevPlanets) => prevPlanets.filter((planet) => planet.id !== id));
        } catch (error) {
            console.error("Error deleting planet:", error);
            Alert.alert("Error", "No se pudo borrar el planeta");
        }
    };
    const goToDetails = (id) => {
        navigation.navigate('PlanetDetails', {id});
    }
    const goToAddplanet = () => {
        navigation.navigate('AddPlanet');
    }
    const goToEditPlanet = (id) => {
        navigation.navigate('EditPlanet', {id});
    }


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Planetas del sistema Solar</Text>

            <TouchableOpacity style={styles.addButton} onPress={goToAddplanet}>
                <Text style={styles.addButtonText}>Agregar Planeta</Text>
            </TouchableOpacity>

            <FlatList 
            data={planets}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
                <View style={styles.planetItem}> 
                <Image source={{uri: item.image}} style={styles.planetImage}/>
                <View style={styles.planetInfo}>
                    <Text style={styles.planetName}>{item.name}</Text>
                    <Text style={styles.planetDescription}>{item.description}</Text>
                </View>

                <View style={styles.buttonContainer}>

                  <TouchableOpacity onPress={() => goToDetails(item.id)} style={styles.detailButton}>
                    <Text style={styles.buttonText}>Detalles</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => goToEditPlanet(item.id)} style={styles.editButton}>
                    <Text style={styles.buttonText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                    <Text style={styles.buttonText}>Borrar</Text>
                  </TouchableOpacity>
                </View>
                </View >

            )}
            />
        </View>
    )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  planetItem: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignSelf: 'center',
   
  },
  planetImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  planetInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  planetName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  planetDescription: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailButton: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 5,
    marginTop: 8,
  },
  editButton: {
    backgroundColor: '#FFC107', // Color amarillo para editar
    padding: 8,
    borderRadius: 5,
    marginTop: 8,
  },
  deleteButton: {
    backgroundColor: '#FF5733',
    padding: 8,
    borderRadius: 5,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PlanetList;
