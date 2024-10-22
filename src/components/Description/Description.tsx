// import { useState } from "react"
import { IProps } from "./type"
import './Description.css'
import React, { BaseSyntheticEvent } from "react"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchGet } from "../_rtk/slices/filesSlice"


export default function Description({data}: IProps) {
  const dispatch = useDispatch()
  let token = "Bearer " + String(localStorage.getItem('token'))
  let unloadDate  = new Date(data.unload_date)
  let fileUrl = String(data.file)
  let lastLoadDate
  const navigate = useNavigate();

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
    let response = await fetch(`http://127.0.0.1:8000/api/v1/file/${data.id}`, {headers: {"Authorization": token}, method: 'DELETE'})
    dispatch(fetchGet())
    if (!response.ok) {
      alert('Произошла ошибка при удалении файла')
    }
  }

  async function handleGetShareLink(element: BaseSyntheticEvent) {
    let response = await (await fetch(`http://127.0.0.1:8000/anonym_link/${data.id}`, {headers: {"Authorization": token}})).json()
    await navigator.clipboard.writeText(response.link)
    alert('Ссылка скопирована')
  }


  return (
    <div className="description_container">
        <button>Edit</button>
        <span className="description_container_subtitle"><b>Name:</b><a onClick={handleOpenFile} className="description_container_file_name">{data.name}</a></span>
        <span className="description_container_subtitle"><b>Commit:</b>{data.description}</span>
        <span className="description_container_subtitle"><b>Size:</b>{data.size}</span>
        <span className="description_container_subtitle"><b>Unload date:</b>{`${unloadDate.getDay()}.${unloadDate.getDate()}.${unloadDate.getFullYear()}`}</span>
        <span className="description_container_subtitle"><b>Last load date:</b>{lastLoadDate}</span>
        <button className="description_container_share" onClick={handleGetShareLink}>Share</button>
        <button onClick={handleDeleteFile}>X</button>
    </div>
  )
}