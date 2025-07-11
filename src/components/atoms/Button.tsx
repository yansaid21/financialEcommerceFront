// src/components/atoms/Button.tsx
'use client'

type Props = {
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

export default function Button({ onClick, children, className = '' }: Props) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-md font-semibold transition shadow-md focus:outline-none ${className}`}
    >
      {children}
    </button>
  )
}
