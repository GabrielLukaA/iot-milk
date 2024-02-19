"use client"

export function useLocalStorage<T>(){
  const getLocalStorage = (key:string) => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null
 } 


 const setLocalStorage = (key:string, value:T) => {
  return localStorage.setItem(key, JSON.stringify(value))
  }

  return {
    setLocalStorage, getLocalStorage
  }
}