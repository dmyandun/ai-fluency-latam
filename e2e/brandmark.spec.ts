import { test, expect } from '@playwright/test'

/**
 * El recuadro azul ya lleva el "AI", así que el texto continúa en "Fluency
 * LATAM". Escribir "AI Fluency" al lado del recuadro produce "AI AI Fluency".
 */
const PAGES = ['/', '/explore', '/assessment', '/privacy']

for (const path of PAGES) {
  test(`el mástil de ${path} no repite el "AI"`, async ({ page }) => {
    await page.goto(path)

    const nav = page.locator('nav').first()
    await expect(nav).toBeVisible()

    const brand = nav.getByRole('link').first()
    // El texto accesible junta recuadro y palabra: "AI" + "Fluency LATAM".
    await expect(brand).toHaveText(/^AI\s*Fluency LATAM$/)
    await expect(brand).not.toHaveText(/AI\s*AI/)
  })
}
