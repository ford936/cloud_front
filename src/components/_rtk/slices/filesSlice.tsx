import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { IDescription, IProps, IPropsList } from '../../Description/type'

export interface CounterState {
  data: IProps
}

const initialState: IPropsList = {
    data: [{
            id: 1,
            name: 'game.exe',
            description: 'react',
            size: 'm',
            unload_date: '02.01.2022',
            last_load_date: '14.12.2023'
        },
        {
            id: 2,
            name: 'text.txt',
            description: 'nestjs',
            size: 'xl',
            unload_date: '20.11.2023',
            last_load_date: '13.12.2023'
        }]
}

export const fetchGet = createAsyncThunk(
    'http://127.0.0.1:8000/api/v1/file/',
    async () => {
        let token = "Bearer " + String(localStorage.getItem('token'))
        const response = await fetch('http://127.0.0.1:8000/api/v1/file/', {headers: {"Authorization": token}})
        return response.json()
    }
  )

export const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchGet.fulfilled, (state, action) => {
            state.data = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
// export const { } = fileSlice.actions

export default fileSlice.reducer