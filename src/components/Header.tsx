
'use client'
import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import Box from '@mui/material/Box'
import ImportExportButtons from './ImportExportButtons'
import { useState } from 'react'

export default function Header() {
  const [mode, setMode] = useState(typeof window !== 'undefined' ? (localStorage.getItem('ddtm_theme') || 'light') : 'light')
  const toggle = () => {
    const next = mode === 'light' ? 'dark' : 'light'
    setMode(next)
    try { localStorage.setItem('ddtm_theme', next) } catch {}
    location.reload()
  }
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>DDTM v3</Typography>
        <Box sx={{ mr: 2 }}>
          <ImportExportButtons />
        </Box>
        <Switch checked={mode==='dark'} onChange={toggle} />
      </Toolbar>
    </AppBar>
  )
}
