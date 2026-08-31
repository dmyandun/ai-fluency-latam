import { test, expect } from '@playwright/test'
import { QUESTION_COUNT, answerAllQuestions, expectRecommendation } from './helpers'

/**
 * Camino directo: la landing promete un roadmap de 12 meses, y este es el
 * trayecto corto para llegar a él sin pasar por las simulaciones.
 */
test('desde la landing hasta el roadmap sin ver simulaciones', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: /^Iniciar diagnóstico/ }).first().click()
  await expect(page).toHaveURL(/\/assessment/)

  // Paso 1 de 3: país.
  await page.getByLabel('Selecciona tu país').selectOption({ label: 'Ecuador' })
  await page.getByRole('button', { name: /Continuar/ }).click()

  // Paso 2 de 3: industria.
  await page.getByRole('button', { name: 'Banca y Finanzas' }).click()
  await page.getByRole('button', { name: /Continuar/ }).click()

  // Paso 3 de 3: las 13 dimensiones en una sola tabla.
  expect(await answerAllQuestions(page)).toBe(QUESTION_COUNT)
  await page.getByRole('button', { name: /Ver mis resultados/ }).click()

  await expect(page).toHaveURL(/\/results/)
  await expectRecommendation(page)

  // El roadmap vive tras su pestaña y debe traer las cinco fases del framework 4D.
  await page.getByRole('button', { name: /Ver roadmap de 12 meses/ }).click()
  for (const phase of ['Delegation', 'Description', 'Discernment', 'Diligence', 'AI Fluency']) {
    await expect(page.getByText(phase, { exact: false }).first()).toBeVisible()
  }
})

test('el diagnóstico persiste al recargar la página de resultados', async ({ page }) => {
  await page.goto('/assessment')
  await page.getByLabel('Selecciona tu país').selectOption({ label: 'Ecuador' })
  await page.getByRole('button', { name: /Continuar/ }).click()
  await page.getByRole('button', { name: 'Banca y Finanzas' }).click()
  await page.getByRole('button', { name: /Continuar/ }).click()
  await answerAllQuestions(page)
  await page.getByRole('button', { name: /Ver mis resultados/ }).click()
  await expect(page).toHaveURL(/\/results/)

  // El estado vive sólo en localStorage: si no persiste, el guard devuelve al inicio.
  await page.reload()
  await expect(page).toHaveURL(/\/results/)
  await expectRecommendation(page)
})

test('/results sin diagnóstico previo redirige al diagnóstico', async ({ page }) => {
  await page.goto('/results')
  await expect(page).toHaveURL(/\/assessment/)
})
