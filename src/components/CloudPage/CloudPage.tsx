import React, { BaseSyntheticEvent, useState, useEffect } from 'react'
import './CloudPage.css'
import Description from '../Description/Description'
import { useNavigate } from 'react-router-dom'
import { RootState } from "@reduxjs/toolkit/query"
import { useSelector, useDispatch } from 'react-redux'
import { fetchGet } from '../_rtk/slices/filesSlice'
import { jwtDecode } from "jwt-decode";
import {backendUrl} from '../../url'



export default function CloudPage() {
    let [add, setAdd] = useState(false)
    const navigate = useNavigate();
    const data = useSelector((state: RootState) => state.files.data)
    const dispatch = useDispatch()
    // const [form, setForm] = useState<SaveFile>({
    //     file: '',
    //     description: ''
    //   })
    const [file, setFile] = useState('')
    const [description, setDescription] = useState('')
    // const jwtToken = localStorage.getItem('token')
    let token = jwtDecode(localStorage.getItem('token'))
    

    useEffect(() => {
        dispatch(fetchGet())
    }, [])

    
    
    const listItems = data.map(el => {
        return (<Description data={el} key={el.id} />)
    })

    function handleLogout(element: BaseSyntheticEvent) {
        localStorage.clear()
        return navigate("/");
    }

    // function handleInputChange(element: React.ChangeEvent<HTMLInputElement>) {
    //     const { name, value } = element.target
        
    //     setForm(PrevForm => ({
    //         ...PrevForm,
    //         [name]: value
    //     }))}

    function handleInputFile(element: React.ChangeEvent<HTMLInputElement>) {
        const file = element.target.files[0];
        setFile(file)
    }

    function handleInputDescription(element: React.ChangeEvent<HTMLInputElement>) {
        setDescription(element.target.value)}

    async function handleSubmit(element: React.FormEvent<HTMLFormElement>) {
        element.preventDefault()
        let token = "Bearer " + String(localStorage.getItem('token'))
        let myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        let formdata = new FormData();
        formdata.append("file", file);
        formdata.append("description", description);

        let response = await fetch(`${backendUrl}api/v1/file/`, {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        })
        console.log(formdata)
        if (response.ok) {
            dispatch(fetchGet())
        }
        else {
            alert("Не корректные данные");
        }}

        

    function handleCancel(element: React.ChangeEvent) {
        setAdd(false)
        setDescription('')
        setFile('')
    }

    const addOff = (
        <div className='work_space_files_title_add_block'>
            <button onClick={() => setAdd(true)}>Add file</button>
        </div>
    )

    const addOn = (
        <div className='work_space_files_title_add_block'>
             <form onSubmit={handleSubmit}>
                <button onClick={handleCancel} className='work_space_files_title_add_block_cancel'>Cancel</button>
                <input type="file" onChange={handleInputFile}/>
                <input type="text" onChange={handleInputDescription} id='description' name='description' value={description}/>
                <button>Save</button>
            </form>
        </div>
    )

    return (
        <>
            <div className='work_space'>
                <span className='work_space_files_title'>
                    <p>Files</p>
                    {listItems}
                    {add ? addOn : addOff}
                </span>

            </div>
            <div className='work_menu'>
                <span className='work_menu_user_name'>{token.username}</span>
                <button className='work_menu_logout_button' onClick={handleLogout}>Logout</button>
            </div>
        </>        
    )
    }