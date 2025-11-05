
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

export type Row = { id: string; name?: string; email?: string; age?: number; role?: string; [k:string]: any }
export type Column = { key: string; label: string; visible: boolean }

const sampleRows: Row[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com', age: 28, role: 'Admin' },
  { id: '2', name: 'Bob', email: 'bob@example.com', age: 33, role: 'Manager' },
  { id: '3', name: 'Charlie', email: 'charlie@example.com', age: 22, role: 'User' },
]

const initialColumns: Column[] = [
  { key: 'name', label: 'Name', visible: true },
  { key: 'email', label: 'Email', visible: true },
  { key: 'age', label: 'Age', visible: true },
  { key: 'role', label: 'Role', visible: true },
]

const initialState = {
  rows: sampleRows,
  columns: initialColumns,
  search: '',
  sort: { key: '', direction: 'asc' as 'asc' | 'desc' }
}

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setRows(state, action: PayloadAction<Row[]>) { state.rows = action.payload },
    addRow(state, action: PayloadAction<Row>) { 
      const { id, ...rest } = action.payload;
      state.rows.push({ id: uuidv4(), ...rest });
    },
    updateRow(state, action: PayloadAction<Row>) {
      const idx = state.rows.findIndex(r=>r.id===action.payload.id)
      if(idx>=0) state.rows[idx] = action.payload
    },
    deleteRow(state, action: PayloadAction<string>) { state.rows = state.rows.filter(r=>r.id!==action.payload) },
    setColumns(state, action: PayloadAction<Column[]>) { state.columns = action.payload },
    toggleColumn(state, action: PayloadAction<string>) {
      const c = state.columns.find(col=>col.key===action.payload); if(c) c.visible = !c.visible
    },
    addColumn(state, action: PayloadAction<Column>) { state.columns.push(action.payload) },
    setSearch(state, action: PayloadAction<string>) { state.search = action.payload },
    setSort(state, action: PayloadAction<{key:string;direction:'asc'|'desc'}>) { state.sort = action.payload }
  }
})

export const { setRows, addRow, updateRow, deleteRow, setColumns, toggleColumn, addColumn, setSearch, setSort } = tableSlice.actions
export default tableSlice.reducer
