import { Dimensions } from 'react-native';
import { format } from 'date-fns';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const todaysDate = format(new Date(), 'yyyy-MM-dd');
export const formatDate = (date: string) =>
  format(new Date(date), 'yyyy-MM-dd');
