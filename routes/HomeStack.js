import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import ChartScreen from "../screens/ChartScreen";


const screens = {
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: "Markets",
    },
  },
  Chart: {
    screen: ChartScreen,
    navigationOptions: {
      title: "Coin Data",
    },
  },
};

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTransparent: true,
        headerStyle: {
            height: 80,
        }

    }
});


export default createAppContainer(HomeStack)
