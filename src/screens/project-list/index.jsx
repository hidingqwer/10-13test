import React from "react"
import { SearchPanel } from "./search-panel"
import { List } from './list'
import { useEffect, useState } from 'react'
import * as qs from 'qs'//不用再写name=tom&sex=男。。。
import { cleanObject, useDebounce, useMount } from '../../utils'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])
  const debouncedParam = useDebounce(param, 2000)

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
      if (response.ok) {//请求成功
        setList(await response.json())
      }
    })
  }, [debouncedParam])

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {//请求成功
        setUsers(await response.json())
      }
    })
  }, [])

  return <div>
    <SearchPanel param={param} setParam={setParam} users={users} />
    <List list={list} users={users} />
  </div>
}