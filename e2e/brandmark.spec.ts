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

/** La marca del pie también lleva el recuadro, en tamaño compacto. */
for (const path of ['/', '/privacy']) {
  test(`el pie de ${path} muestra la marca completa`, async ({ page }) => {
    await page.goto(path)

    const footer = page.locator('footer')
    await footer.scrollIntoViewIfNeeded()

    const brand = footer.getByRole('link', { name: /Fluency LATAM/ }).first()
    await expect(brand).toHaveText(/^AI\s*Fluency LATAM$/)
  })
}

/**
 * La política conservaba el tema oscuro retirado: los títulos eran texto blanco
 * sobre fondo claro, es decir invisibles.
 */
test('los títulos de la política de privacidad son legibles', async ({ page }) => {
  await page.goto('/privacy')

  for (const name of [/Política de Privacidad/, /Quiénes somos/]) {
    const heading = page.getByRole('heading', { name }).first()
    await expect(heading).toBeVisible()

    const color = await heading.evaluate((el) => getComputedStyle(el).color)
    // Un texto casi blanco sobre el fondo claro de la app no se ve.
    const [r, g, b] = color.match(/\d+/g)!.map(Number)
    expect(r + g + b).toBeLessThan(450)
  }
})

/**
 * Dentro de la landing la marca sube al principio. Se comprueba dos veces
 * seguidas a propósito: con sólo el ancla, el segundo clic repite el mismo hash
 * y el navegador ya no desplaza nada.
 */
test('la marca de la landing sube al inicio, también al repetir el clic', async ({ page }) => {
  await page.goto('/')

  for (const container of ['nav', 'footer']) {
    await page.evaluate(() => window.scrollTo(0, 2500))
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500)

    await page.locator(container).first().getByRole('link', { name: /Fluency LATAM/ }).first().click()
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
  }
})
