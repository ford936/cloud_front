import { BaseSyntheticEvent, useState, useEffect } from 'react'
import './CloudPage.css'
import Description from '../Description/Description'
import { useNavigate } from 'react-router-dom'
import { IDescription, IProps } from '../Description/type'


export default function CloudPage() {
    const navigate = useNavigate();

    const [data, setData] = useState<IDescription[]>([{
        id: 1,
        name: 'game.exe',
        description: 'react',
        size: 'm',
        unloadDate: '02.01.2022',
        lastLoadDate: '14.12.2023'
    },
    {
        id: 2,
        name: 'text.txt',
        description: 'nestjs',
        size: 'xl',
        unloadDate: '20.11.2023',
        lastLoadDate: '13.12.2023'
    }])

    

    useEffect(() => {
        let token = "Bearer " + String(localStorage.getItem('token'))
        fetch('http://127.0.0.1:8000/api/v1/file/', {headers: {"Authorization": token}})
        .then(response => response.json())
        .then(test => setData(test))
    }, [])

    
    
    const listItems = data.map(el => {
        return (<Description data={el} key={el.id}/>)
    })

    function handleLogout(element: BaseSyntheticEvent) {
        console.log(element)
        localStorage.clear()
        return navigate("/");
    }

    function handleDeleteFile(element: BaseSyntheticEvent) {
        console.log(element.target)
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
                <span>JUNAER</span>
                <button className='work_menu_logout_button'>Logout</button>
            </div>
        </>


        
    )
    }