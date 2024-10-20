import { useState } from 'react'
import './CloudPage.css'
import Description from "../Description/Description"
import { IDescription, IProps } from "../Description/type"


export default function CloudPage() {
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

    const listItems = data.map(el => {
        return (<Description data={el} key={el.id}/>)
    })

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
                <button>Logout</button>
            </div>
        </>

        
        
    )
    }