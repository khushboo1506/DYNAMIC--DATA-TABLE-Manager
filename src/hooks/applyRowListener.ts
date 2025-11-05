
'use client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateRow } from '../store/tableSlice'

export default function useApplyRowListener() {
  const dispatch = useDispatch()
  useEffect(()=> {
    const handler = (ev:any) => {
      const row = ev.detail
      dispatch(updateRow(row))
    }
    window.addEventListener('ddtm-apply-row', handler as any)
    return ()=> window.removeEventListener('ddtm-apply-row', handler as any)
  }, [dispatch])
  return null
}
