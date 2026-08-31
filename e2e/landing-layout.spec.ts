import { test, expect, type Locator } from '@playwright/test'

/** Alto del solapamiento entre dos elementos, en píxeles. */
async function verticalOverlap(a: Locator, b: Locator, liftA = 0) {
  const boxA = await a.boundingBox()
  const boxB = await b.boundingBox()
  if (!boxA || !boxB) throw new Error('elemento sin caja: ¿no se está renderizando?')

  const topA = boxA.y - liftA
  const bottom = Math.min(topA + boxA.height, boxB.y + boxB.height)
  const top = Math.max(topA, boxB.y)
  return Math.max(0, bottom - top)
}

/**
 * La tarjeta "Roadmap generado" flota sobre la vista previa del hero y llegó a
 * tapar la fila de fases. El build no detecta un solapamiento, así que se mide.
 */
test.describe('vista previa del hero', () => {
  for (const width of [1920, 1440, 1280, 1024, 768]) {
    test(`la tarjeta flotante no tapa las fases a ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/')

      const floating = page.getByText('20+ iniciativas priorizadas').locator('..')

      // Bajo el breakpoint sm la tarjeta se oculta y no hay nada que comprobar.
      if (!(await floating.isVisible())) return

      // Sin CSS aplicado toda medición es basura y el test pasaría en falso.
      await expect(floating).toHaveCSS('position', 'absolute')

      for (const phase of ['Fase 1', 'Fase 2', 'Fase 3']) {
        const cell = page.getByText(phase).locator('..')
        // La animación float-slow eleva la tarjeta hasta 10px: se mide el peor caso.
        expect(await verticalOverlap(floating, cell, 10)).toBe(0)
      }
    })
  }
})
