// import { useState } from "react"
import { IProps, SendChangeForm } from "./type"
import './Description.css'
import React, { BaseSyntheticEvent, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchGet } from '../_rtk/slices/filesSlice'
import { backendUrl } from "../../url"


export default function Description({data}: IProps) {
  let [edit, setEdit] = useState(false)
  const dispatch = useDispatch()
  let token = "Bearer " + String(localStorage.getItem('token'))
  let unloadDate  = new Date(data.unload_date)
  let fileUrl = String(data.file)
  let lastLoadDate
  const navigate = useNavigate();
  const [form, setForm] = useState<SendChangeForm>({
    name: data.name,
    description: data.description
  })

  if (data.last_load_date) {
    lastLoadDate = new Date(data.last_load_date)
    lastLoadDate = `${lastLoadDate.getDay()}.${lastLoadDate.getDate()}.${lastLoadDate.getFullYear()}`
  }else{
    lastLoadDate = '-'
  }

  function handleOpenFile(element: React.FormEvent) {
    let token = "Bearer " + String(localStorage.getItem('token'))
    fetch(fileUrl, {headers: {"Authorization": token}})
    .then(response => response.blob())
    .then(blob => {
      // Создаем ссылку на blob-объект и автоматически запускаем скачивание
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = data.name;
      link.click();

      // Освобождаем ресурсы
      URL.revokeObjectURL(downloadUrl);
    })
    .catch(error => {
      alert('Файл не доступен')
  })}

  async function handleDeleteFile(element: BaseSyntheticEvent) {
    let response = await fetch(`${backendUrl}api/v1/file/${data.id}`, {headers: {"Authorization": token}, method: 'DELETE'})
    dispatch(fetchGet())
    if (!response.ok) {
      alert('Произошла ошибка при удалении файла')
    }
  }

  async function handleGetShareLink(element: BaseSyntheticEvent) {
    let response = await (await fetch(`${backendUrl}anonym_link/${data.id}`, {headers: {"Authorization": token}})).json()
    console.log(response)
    navigator.clipboard.writeText(`${backendUrl}media/cloud/${response.link}`)
    alert('Ссылка скопирована')
  }

  async function handleEdit(element: BaseSyntheticEvent) {
    setEdit((old_state => !old_state))
  }

  function handleInputChange(element: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = element.target
    console.log(name, value)
    
    setForm(PrevForm => ({
        ...PrevForm,
        [name]: value
    }))}

  async function handleSave(element: BaseSyntheticEvent) {
    const body = {name: form.name, description: form.description}
    const response = await (await fetch(`${backendUrl}api/v1/file/${data.id}/`, {method: 'PATCH', body: JSON.stringify(body),
    headers: {"Authorization": token, 'Content-Type': 'application/json;charset=utf-8'}})).json()
    dispatch(fetchGet())
    setEdit(false)
  }


  const edit_off = (
    <div className="description_container">
        <button onClick={handleEdit}>Edit</button>
        <span className="description_container_subtitle"><b>Name:</b><a onClick={handleOpenFile} className="description_container_file_name">{data.name}</a></span>
        <span className="description_container_subtitle"><b>Comment:</b>{data.description}</span>
        <span className="description_container_subtitle"><b>Size:</b>{data.size}</span>
        <span className="description_container_subtitle"><b>Unload date:</b>{`${unloadDate.getDay()}.${unloadDate.getDate()}.${unloadDate.getFullYear()}`}</span>
        <span className="description_container_subtitle"><b>Last load date:</b>{lastLoadDate}</span>
        <button className="description_container_share" onClick={handleGetShareLink}>Share</button>
        <button onClick={handleDeleteFile}>X</button>
    </div>
  )

  const edit_on = (
    <div className="description_container">
    <button onClick={handleEdit}>Cancel</button>
    <span className="description_container_subtitle"><b>Name:</b><input onChange={handleInputChange} type="text" name="name" value={form.name}/></span>
    <span className="description_container_subtitle"><b>Comment:</b><input onChange={handleInputChange} type="text" name="description" value={form.description}/></span>
    <button onClick={handleSave}>Save</button>
    <span className="description_container_subtitle"><b>Size:</b>{data.size}</span>
    <span className="description_container_subtitle"><b>Unload date:</b>{`${unloadDate.getDay()}.${unloadDate.getDate()}.${unloadDate.getFullYear()}`}</span>
    <span className="description_container_subtitle"><b>Last load date:</b>{lastLoadDate}</span>
    <button className="description_container_share" onClick={handleGetShareLink}>Share</button>
    <button onClick={handleDeleteFile}>X</button>
</div>
  )
 
  return (
    <>
      {edit ? edit_on : edit_off}
    </>
  )
  }