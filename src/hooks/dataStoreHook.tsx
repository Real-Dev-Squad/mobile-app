import AsyncStorage from '@react-native-async-storage/async-storage'


export const DataStoreHook = (name:string, value:string) => {
     AsyncStorage.setItem(name, value)

   };
 
export const getData = async (item:string) => {
     return AsyncStorage.getItem(item).then((res) => {
       console.log("res", res);
       return res ? JSON.parse(res) : "";
     });
   
   };
