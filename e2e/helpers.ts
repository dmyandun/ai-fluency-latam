import { expect, type Page } from '@playwright/test'

/**
 * Preguntas que responde el usuario. El scoring maneja 13 dimensiones, pero tres
 * se derivan de la clasificación de actividades y nunca se preguntan.
 */
export const QUESTION_COUNT = 10

/**
 * Responde una pantalla de preguntas usando la etiqueta accesible de cada botón
 * de escala (`<enunciado>: <valor> de 5`), en vez de posiciones o clases CSS.
 */
export async function answerAllQuestions(page: Page, value = 4) {
  const buttons = page.getByRole('button', { name: new RegExp(`: ${value} de 5$`) })
  const total = await buttons.count()

  for (let i = 0; i < total; i++) {
    await buttons.nth(i).click()
  }
  return total
}

/** Elige país (un <select>) e industria (una grilla de botones). */
export async function pickCountryAndIndustry(page: Page) {
  await page.getByLabel('Selecciona tu país').selectOption({ label: 'Ecuador' })
  await page.getByRole('button', { name: 'Banca y Finanzas' }).first().click()
}

/** Comprueba que la vista muestra una recomendación con su modelo ganador. */
export async function expectRecommendation(page: Page) {
  await expect(page.getByText(/Recomendación:/i).first()).toBeVisible()
}
