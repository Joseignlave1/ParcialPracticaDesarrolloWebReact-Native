import { createStackNavigator } from "@react-navigation/stack";
import AddPlanet from "../Screens/AddPlanet";
import EditPlanet from "../Screens/EditPlanet";
import PlanetList from "../Screens/PlanetList";
import PlanetDetails from "../Screens/PlanetDetails";
const Stack = createStackNavigator();

const App = () => {
    return (
    <Stack.Navigator initialRouteName="PlanetList">
      <Stack.Screen name="PlanetList" component={PlanetList} />
      <Stack.Screen name="PlanetDetails" component={PlanetDetails} />
      <Stack.Screen name="AddPlanet" component={AddPlanet} />
      <Stack.Screen name="EditPlanet" component={EditPlanet} />
    </Stack.Navigator>
    )
}

export default App;