
'use client'
import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DataTable from '../src/components/DataTable'
import Header from '../src/components/Header'
import useApplyRowListener from '../src/hooks/applyRowListener'

export default function Home() {
  useApplyRowListener()
  return (
    <Container maxWidth="lg">
      <Header />
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>Dynamic Data Table Manager (v3)</Typography>
        <DataTable />
      </Box>
    </Container>
  )
}
