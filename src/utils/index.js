import { useEffect, useState } from 'react'
export const isFalsy = (value) => value === 0 ? true : !!value

export const cleanObject = (object) => {
  const result = { ...object }
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (!isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback) => {
  useEffect(() => {
    callback()
  }, [])
}

export const useDebounce = (value, delay) => {//去抖 
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    //value变化后设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    //useEffect的匿名函数中return匿名函数的相当于componentDidunMount，进行卸载任务
    //每次在上一个useEffect处理完以后在运行
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}