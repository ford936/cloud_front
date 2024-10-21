// import { useState } from "react"
import { IProps } from "./type"
import './Description.css'

export default function Description(data: IProps) {
  return (
    <div className="description_container">
        <button>Edit</button>
        <span className="description_container_subtitle"><b>Name:</b> {data.data.name}</span>
        <span className="description_container_subtitle"><b>Commit:</b> {data.data.description}</span>
        <span className="description_container_subtitle"><b>Size:</b> {data.data.size}</span>
        <span className="description_container_subtitle"><b>Unload date:</b> {data.data.unloadDate}</span>
        <span className="description_container_subtitle"><b>Last load date:</b> {data.data.lastLoadDate}</span>
        <button className="description_container_share">Share</button>
        <button>X</button>
    </div>
  )
}