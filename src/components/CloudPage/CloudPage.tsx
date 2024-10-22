import { BaseSyntheticEvent, useState, useEffect } from 'react'
import './CloudPage.css'
import Description from '../Description/Description'
import { useNavigate } from 'react-router-dom'
import { IDescription, IProps } from '../Description/type'
import { RootState } from "@reduxjs/toolkit/query"
import { useSelector, useDispatch } from 'react-redux'
import { fetchGet } from '../_rtk/slices/filesSlice'



export default function CloudPage() {
    const navigate = useNavigate();
    const data = useSelector((state: RootState) => state.files.data)
    const dispatch = useDispatch()
    

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

    

    return (
        <>
            <div className='work_space'>
                <span className='work_space_files_title'>
                    <p>Files</p>
                    {listItems}
                </span>
            </div>
            <div className='work_menu'>
                <span>Foks9n</span>
                <button className='work_menu_logout_button' onClick={handleLogout}>Logout</button>
            </div>
        </>


        
    )
    }