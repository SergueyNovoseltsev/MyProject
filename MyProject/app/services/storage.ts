import {MMKV} from 'react-native-mmkv'

export const storage = new MMKV()

export const clientStorage = {
  setItem: (key: string, value: string | number | boolean) => {
    storage.set(key, value)
  },
  setObject: (key: string, value: Object) => {
    storage.set(key, JSON.stringify(value))
  },
  getItem: (key: string) => {
    const value = storage.getString(key)
    return value === undefined ? null : value
  },
  getObject: (key: string) => {
    const value = storage.getString(key)
    return value === undefined ? null : JSON.parse(value)
  },
  removeItem: (key: string) => {
    storage.delete(key)
  },
  contains: (key: string) => {
    return storage.contains(key)
  },
}
