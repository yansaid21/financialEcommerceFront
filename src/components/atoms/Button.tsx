'use client'

type Props = {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
}

export default function Button({ children, onClick, type = 'button', className }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded font-semibold ${className}`}
    >
      {children}
    </button>
  )
}
