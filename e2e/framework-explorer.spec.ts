import { test, expect, type Locator } from '@playwright/test'

/**
 * La matriz del marco compone la explicación a partir de un fragmento por par
 * modelo × capa. Se comprueba que el ensamblado responde a ambas dimensiones.
 */
test.describe('explorador del marco', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#modelos')
  })

  test('el título refleja el modelo y las capas activas', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /^Aumentación \+/ })
    await expect(heading).toBeVisible()

    await page.getByRole('button', { name: /^Agencia/ }).click()
    await expect(page.getByRole('heading', { name: /^Agencia \+ Local \+ API$/ })).toBeVisible()

    await page.getByRole('button', { name: 'IA Tradicional / ML' }).click()
    await expect(page.getByRole('heading', { name: /^Agencia \+ Local \+ API \+ ML$/ })).toBeVisible()
  })

  test('el texto de una capa depende del modelo elegido', async ({ page }) => {
    // Misma capa (Local), dos modelos: el aporte descrito debe cambiar.
    await page.getByRole('button', { name: /^Aumentación/ }).click()
    await expect(page.getByText(/Acompaña al experto donde el dato/)).toBeVisible()

    await page.getByRole('button', { name: /^Agencia/ }).click()
    await expect(page.getByText(/El agente toca sistemas internos/)).toBeVisible()
    await expect(page.getByText(/Acompaña al experto donde el dato/)).toHaveCount(0)
  })

  test('nunca se queda sin capas seleccionadas', async ({ page }) => {
    // Una combinación vacía no explicaría nada: la última capa no se puede quitar.
    await page.getByRole('button', { name: 'IA Generativa Local' }).click()
    await page.getByRole('button', { name: 'IA Generativa vía API' }).click()

    const remaining = page.getByRole('button', { name: /IA Generativa|IA Tradicional/, pressed: true })
    await expect(remaining).toHaveCount(1)
  })
})

/**
 * El flujograma debe leerse como un árbol: el tronco del segundo nivel nace del
 * modelo elegido, no del centro. Es la parte que ninguna comprobación funcional
 * cubre y que se rompería en silencio.
 */
test.describe('ramificación del flujograma', () => {
  for (const model of ['Automatización', 'Agencia', 'Aumentación']) {
    test(`el tronco de tecnología nace de ${model}`, async ({ page }) => {
      await page.goto('/#modelos')
      await page.getByRole('button', { name: model, exact: true }).click()

      const trunk = page.locator('[data-flow-trunk="2 · Tecnología"]')
      const node = page.getByRole('button', { name: model, exact: true })

      // El tronco se desliza hasta su rama: se sondea hasta que la posición cuaja,
      // en vez de medir a mitad de la transición.
      await expect
        .poll(async () => {
          const trunkBox = await trunk.boundingBox()
          const nodeBox = await node.boundingBox()
          if (!trunkBox || !nodeBox) return Number.POSITIVE_INFINITY
          const trunkCenter = trunkBox.x + trunkBox.width / 2
          const nodeCenter = nodeBox.x + nodeBox.width / 2
          return Math.abs(trunkCenter - nodeCenter)
        })
        .toBeLessThan(3)
    })
  }
})

/**
 * Al activar o desactivar capas el panel cambiaba de alto y empujaba lo que
 * tenía debajo. El alto de las tres tarjetas está reservado: el explorador debe
 * medir lo mismo con una capa que con tres.
 */
/** Alto tras dos lecturas iguales: evita medir en mitad de un re-render. */
async function stableHeight(target: Locator) {
  let previous = -1
  for (let i = 0; i < 20; i++) {
    const height = Math.round((await target.boundingBox())!.height)
    if (height === previous) return height
    previous = height
    await target.page().waitForTimeout(100)
  }
  return previous
}

test.describe('alto del explorador', () => {
  const LAYERS = [
    'IA Generativa Local',
    'IA Generativa vía API',
    'IA Tradicional / ML',
  ]

  for (const width of [1440, 1280, 1024, 768, 640]) {
    test(`no cambia al variar modelo y capas a ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1200 })
      await page.goto('/#modelos')
      const explorer = page.locator('#modelos .rounded-3xl').first()
      await expect(explorer).toBeVisible()

      const heights = new Set<number>()
      for (const model of ['Automatización', 'Agencia', 'Aumentación']) {
        await page.getByRole('button', { name: new RegExp(`^${model}`) }).click()
        for (const combo of [[LAYERS[0]], [LAYERS[0], LAYERS[1]], LAYERS]) {
          for (const layer of LAYERS) {
            const button = page.getByRole('button', { name: layer })
            const pressed = (await button.getAttribute('aria-pressed')) === 'true'
            if (pressed !== combo.includes(layer)) await button.click()
          }
          heights.add(await stableHeight(explorer))
        }
      }

      expect([...heights]).toHaveLength(1)
    })
  }
})
