
'use client'
import React, { useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { setSearch, setSort, deleteRow } from '../store/tableSlice'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import TablePagination from '@mui/material/TablePagination'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import ManageColumnsModal from './ManageColumnsModal'
import Button from '@mui/material/Button'

export default function DataTable() {
  const dispatch = useDispatch()
  const rows = useSelector((s: RootState) => s.table.rows)
  const columns = useSelector((s: RootState) => s.table.columns)
  const search = useSelector((s: RootState) => s.table.search)
  const sort = useSelector((s: RootState) => s.table.sort)

  const [page, setPage] = useState(0)
  const [rowsPerPage] = useState(10)
  const [openManage, setOpenManage] = useState(false)
  const [editingId, setEditingId] = useState<string|null>(null)
  const [draft, setDraft] = useState<Record<string, any>>({})

  const visibleCols = columns.filter(c=>c.visible)

  const filtered = useMemo(()=> {
    const q = (search||'').toLowerCase()
    let data = rows.filter(r => Object.values(r).some(v=> String(v).toLowerCase().includes(q)))
    if(sort.key) {
      data = data.slice().sort((a:any,b:any)=> {
        const av = a[sort.key]; const bv = b[sort.key]
        if(av==null) return -1
        if(bv==null) return 1
        if(av < bv) return sort.direction==='asc'? -1:1
        if(av > bv) return sort.direction==='asc'? 1:-1
        return 0
      })
    }
    return data
  }, [rows, search, sort])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(setSearch(e.target.value)); setPage(0) }
  const handleSort = (key:string) => { const dir = sort.key===key && sort.direction==='asc' ? 'desc' : 'asc'; dispatch(setSort({ key, direction: dir })) }
  const handleChangePage = (_:any, newPage:number) => setPage(newPage)
  const handleDelete = (id:string) => { if(confirm('Delete this row?')) dispatch(deleteRow(id)) }

  const startEdit = (r:any) => { setEditingId(r.id); setDraft({...r}) }
  const cancelEdit = () => { setEditingId(null); setDraft({}) }
  const saveEdit = () => {
    const e = new CustomEvent('ddtm-save-row', { detail: draft })
    window.dispatchEvent(e)
    setEditingId(null); setDraft({})
  }

  React.useEffect(()=> {
    const handler = (ev:any) => { try { const d = ev.detail; const evt = new CustomEvent('ddtm-apply-row', { detail: d }); window.dispatchEvent(evt); } catch(e){} }
    window.addEventListener('ddtm-save-row', handler as any)
    return ()=> window.removeEventListener('ddtm-save-row', handler as any)
  }, [])

  return (
    <Paper>
      <div style={{ display:'flex', gap:12, padding:12, alignItems:'center' }}>
        <TextField placeholder="Global search" value={search} onChange={handleSearch} size="small" />
        <Button variant="outlined" onClick={()=>setOpenManage(true)}>Manage Columns</Button>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {visibleCols.map(c=> (
                <TableCell key={c.key} onClick={()=>handleSort(c.key)} style={{ cursor:'pointer' }}>{c.label} {sort.key===c.key? (sort.direction==='asc'?'▲':'▼'):''}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map(r=> (
              <TableRow key={r.id}>
                {visibleCols.map(c=> (
                  <TableCell key={c.key}>
                    {editingId===r.id ? (
                      <TextField size="small" value={draft[c.key] ?? ''} onChange={(e)=> setDraft(prev=>({...prev, [c.key]: e.target.value}))} />
                    ) : (
                      String(r[c.key] ?? '')
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  {editingId===r.id ? (
                    <>
                      <IconButton onClick={saveEdit}><SaveIcon /></IconButton>
                      <IconButton onClick={cancelEdit}><CloseIcon /></IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={()=>startEdit(r)}><EditIcon /></IconButton>
                      <IconButton onClick={()=>handleDelete(r.id)}><DeleteIcon /></IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination component="div" count={filtered.length} page={page} onPageChange={handleChangePage} rowsPerPage={rowsPerPage} rowsPerPageOptions={[10]} />

      <ManageColumnsModal open={openManage} onClose={()=>setOpenManage(false)} />
    </Paper>
  )
}
