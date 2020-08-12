import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../views/HomeScreen';
import House from '../views/House';
import RealtorPortfolio from '../views/RealtorPortfolio';
import SimilarHouses from '../views/SimilarHouses';

const Root = createStackNavigator(
  {
    Home: HomeScreen,
    House: House,
    Realtor: RealtorPortfolio,
    SimilarHouses: SimilarHouses
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(Root);
