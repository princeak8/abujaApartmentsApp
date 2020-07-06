import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../views/HomeScreen';
import House from '../views/House';

const Root = createStackNavigator(
  {
    Home: HomeScreen,
    House: House,
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(Root);
