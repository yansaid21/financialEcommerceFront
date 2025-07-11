'use client'

import Image from 'next/image'
import Button from '@/components/atoms/Button'

export default function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white px-4">
      <div className="flex flex-col-reverse lg:flex-row items-center max-w-6xl w-full gap-10">
        {/* Texto y botones */}
        <div className="text-center lg:text-left flex-1">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
            Controla tus Finanzas <span className="text-yellow-300">con Precisión</span>
          </h1>
          <p className="text-lg mb-8 text-white/90">
            Visualiza ingresos y gastos, filtra por fecha, y toma decisiones informadas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              onClick={() => (window.location.href = `${API_URL}/auth/google`)}
              className="bg-yellow-400 text-black hover:bg-yellow-500"
            >
              Iniciar sesión
            </Button>
          </div>
        </div>

        <div className="flex-1">
          <Image
            src="/illustrations/finance.svg"
            alt="Finance Illustration"
            width={500}
            height={500}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </main>
  )
}
