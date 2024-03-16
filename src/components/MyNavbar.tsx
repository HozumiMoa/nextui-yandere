import { SearchParams, YandeImage } from '@/interfaces/image'
import React from 'react'
import SearchForm from './SearchForm'
import Setting from './Setting'
import { motion } from 'framer-motion'

interface Props {
  params: SearchParams
  list: YandeImage[]
}

export default function MyNavbar(props: Props): React.ReactElement {
  return (
    <nav
      id="navbar-container"
      className="fixed bottom-0 z-50 max-h-20 w-full sm:left-[50%] sm:m-4 sm:w-auto sm:-translate-x-1/2"
    >
      <motion.div
        className="flex size-full items-center justify-center gap-4 bg-background/70 p-4 
        shadow-md backdrop-blur-md backdrop-saturate-150 sm:rounded-xl"
        initial={{ y: '5rem', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, type: 'spring' }}
      >
        <Setting {...props} />
        <SearchForm {...props} />
      </motion.div>
    </nav>
  )
}
