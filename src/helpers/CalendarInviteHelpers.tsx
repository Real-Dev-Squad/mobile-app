import { Dimensions } from 'react-native';
import { format } from 'date-fns';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const CELL_HEIGHT = 60;
export const todaysDate = format(new Date(), 'dd-MM-yyyy');
export const formatDate = (date: string) =>
  format(new Date(date), 'dd-MM-yyyy');
