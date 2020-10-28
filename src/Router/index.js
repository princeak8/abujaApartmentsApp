import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../views/HomeScreen';
import House from '../views/House';
import RealtorPortfolio from '../views/RealtorPortfolio';
import SimilarHouses from '../views/SimilarHouses';
import SplashScreen from '../views/Splash';

const Root = createStackNavigator(
  {
    Splash: SplashScreen,
    Home: HomeScreen,
    House: House,
    Realtor: RealtorPortfolio,
    SimilarHouses: SimilarHouses
  },
  {
    initialRouteName: 'Splash',
  },
);

export default createAppContainer(Root);
