"use client"
import React, { useRef } from 'react'
import { store } from './Store'
import { Provider } from 'react-redux'

function Wrapper({children}) {
  const storeRef = useRef()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store
  }

  return (
    <Provider store={storeRef.current}>{children}</Provider>
  )
}

export default Wrapper