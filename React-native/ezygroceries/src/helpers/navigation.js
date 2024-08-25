
import { NavigationContainerRef, createNavigationContainerRef } from '@react-navigation/native';

// Create a ref to hold the navigation container
export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
