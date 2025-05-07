
import React from 'react'
import Head from 'next/head' 

import { icon } from '@fortawesome/fontawesome-svg-core'

import Metadata from './components/Metadata';


export const metadata = {
  '/': {
    title: 'ConnectAID Web Application',
    description: 'ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.',
  },
  icons: {
    icon: [
      '/favicon.ico',
    ],
    apple: [
      '/apple-touch-icon.png',
    ],
    shortcut: [
      '/apple-touch-icon.png',
    ]
  },
  manifest: '/site.webmanifest'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
