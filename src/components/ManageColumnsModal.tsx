
'use client'
import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { toggleColumn, addColumn, setColumns } from '../store/tableSlice'

const style = { position: 'absolute' as 'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:400, bgcolor:'background.paper', boxShadow:24, p:4 }

export default function ManageColumnsModal({ open, onClose }: { open:boolean, onClose:()=>void }) {
  const columns = useSelector((s: RootState) => s.table.columns)
  const dispatch = useDispatch()
  const [newKey, setNewKey] = useState('')
  const [newLabel, setNewLabel] = useState('')

  const handleToggle = (k:string) => dispatch(toggleColumn(k))
  const handleAdd = () => {
    if(!newKey) return alert('Key required')
    dispatch(addColumn({ key: newKey, label: newLabel || newKey, visible: true }))
    setNewKey(''); setNewLabel('')
  }

  const handleReset = () => {
    if(confirm('Reset to default columns?')) {
      dispatch(setColumns([
        { key: 'name', label: 'Name', visible:true },
        { key: 'email', label: 'Email', visible:true },
        { key: 'age', label: 'Age', visible:true },
        { key: 'role', label: 'Role', visible:true }
      ]))
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6">Manage Columns</Typography>
        <div style={{ marginTop:12 }}>
          {columns.map(c=> (
            <div key={c.key} style={{ display:'flex', alignItems:'center' }}>
              <Checkbox checked={c.visible} onChange={()=>handleToggle(c.key)} />
              <Typography>{c.label} <small>({c.key})</small></Typography>
            </div>
          ))}
        </div>
        <div style={{ marginTop:12, display:'flex', gap:8 }}>
          <TextField label="Key" value={newKey} onChange={(e)=>setNewKey(e.target.value)} size="small" />
          <TextField label="Label" value={newLabel} onChange={(e)=>setNewLabel(e.target.value)} size="small" />
          <Button variant="contained" onClick={handleAdd}>Add</Button>
        </div>
        <div style={{ marginTop:12 }}>
          <Button onClick={handleReset}>Reset Defaults</Button>
          <Button onClick={onClose} sx={{ ml:2 }}>Close</Button>
        </div>
      </Box>
    </Modal>
  )
}
