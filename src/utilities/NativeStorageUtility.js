import AsyncStorage from '@react-native-async-storage/async-storage';

export default class NativeStorageUtility {

  static async setItem(key, value) {
    try {
      value = JSON.stringify(value);
      return await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(error);
    }
  }

  static async getItem(key) {
    try {
      let value = await AsyncStorage.getItem(key);
      if (value) {
        value = JSON.parse(value);
        // console.log("value" , value);
        return value;
      }
      return null;
    } catch (error) {
      console.error('our', error);
      return {};
    }
  }

  static async removeItem(key) {
    try {
      return await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }

  static async cleanDB() {
    try {
      return await AsyncStorage.clear();
    } catch (error) {
      console.error(error);
    }
  }
}
