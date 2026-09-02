'use client'

import Brandmark from '@/components/Brandmark'

/**
 * La marca dentro de la landing: sube al principio de la página.
 *
 * No basta con `href="/"` — estando ya en la landing no mueve el scroll — ni con
 * el ancla sola: repetir el mismo hash no vuelve a desplazar, así que el segundo
 * clic no haría nada. El `href` queda como respaldo si no hay JavaScript.
 */
export default function HomeBrandmark({ size }: { size?: 'md' | 'sm' }) {
  return (
    <Brandmark
      size={size}
      href="#inicio"
      onClick={(event) => {
        event.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
    />
  )
}
