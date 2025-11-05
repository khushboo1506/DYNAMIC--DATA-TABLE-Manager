
'use client'
import React, { useRef } from 'react'
import Button from '@mui/material/Button'
import Papa from 'papaparse'
import { saveAs } from 'file-saver'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { setRows } from '../store/tableSlice'

export default function ImportExportButtons() {
  const fileRef = useRef<HTMLInputElement|null>(null)
  const rows = useSelector((s: RootState) => s.table.rows)
  const columns = useSelector((s: RootState) => s.table.columns)
  const dispatch = useDispatch()

  const onImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if(!f) return
    Papa.parse(f, {
      header: true, skipEmptyLines: true,
      complete: (res) => {
        const parsed = res.data as any[]
        const transformed = parsed.map((r,i)=> ({ id: String(Date.now()+i), ...r }))
        dispatch(setRows(transformed))
        alert('Imported ' + transformed.length + ' rows')
      },
      error: (err) => { alert('CSV parse error: ' + err.message) }
    })
    e.currentTarget.value = ''
  }

  const onExport = () => {
    const visibleKeys = columns.filter(c=>c.visible).map(c=>c.key)
    const data = rows.map(r=> { const o:any={}; visibleKeys.forEach(k=> o[k]=r[k]); return o })
    const csv = Papa.unparse(data)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'export.csv')
  }

  return (
    <>
      <input ref={fileRef} type="file" accept=".csv,text/csv" style={{ display:'none' }} onChange={onImport} />
      <Button variant="contained" color="secondary" onClick={()=> fileRef.current?.click()} sx={{ mr:1 }}>Import CSV</Button>
      <Button variant="contained" onClick={onExport}>Export CSV</Button>
    </>
  )
}
