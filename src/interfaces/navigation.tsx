import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";

export interface INavigationProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}