import React from 'react'
import AppNav from '../AppNav/AppNav'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
    <AppNav/>
    <Outlet/>
    </>
  )
}
