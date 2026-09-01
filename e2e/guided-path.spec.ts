import { test, expect } from '@playwright/test'
import { QUESTION_COUNT, answerAllQuestions, expectRecommendation, pickIndustry } from './helpers'

/**
 * Camino guiado: /explore usa las simulaciones para despertar curiosidad y de ahí
 * manda al diagnóstico, que vive en su propia página. El resultado, el roadmap y
 * la política se ven en /results, nunca junto a la simulación.
 */
test('desde la simulación se sale al diagnóstico con la industria ya elegida', async ({ page }) => {
  await page.goto('/explore')
  await pickIndustry(page)

  // La salida existe justo donde se elige el contexto, sin scroll por la simulación.
  await page.getByRole('link', { name: /Saltar al diagnóstico/ }).click()

  await expect(page).toHaveURL(/\/assessment\?industry=banking/)
  // La industria viaja en la URL: el paso 1 no se repite.
  await expect(page.getByText(`0 de ${QUESTION_COUNT} respondidas`)).toBeVisible()
  await expect(page.getByText('Banca y Finanzas').first()).toBeVisible()
})

test('de las simulaciones al roadmap y a la política de IA', async ({ page }) => {
  await page.goto('/explore')
  await pickIndustry(page)

  await page.getByRole('link', { name: /Hacer el diagnóstico/ }).click()
  // El botón navega a otra página: contar antes de que cargue devolvería cero.
  await expect(page.getByText(`0 de ${QUESTION_COUNT} respondidas`)).toBeVisible()
  expect(await answerAllQuestions(page)).toBe(QUESTION_COUNT)

  await page.getByRole('button', { name: /Ver mis resultados/ }).click()
  await expect(page).toHaveURL(/\/results/)
  await expectRecommendation(page)

  // Las dos pestañas que la landing promete, ya fuera de la página de simulación.
  await page.getByRole('button', { name: 'Roadmap 12 meses' }).click()
  await expect(page.getByText('D1 · Delegation', { exact: false }).first()).toBeVisible()

  await page.getByRole('button', { name: 'Política de IA' }).click()
  await expect(page.getByText(/Nombre de tu organización/i).first()).toBeVisible()
})

test('la simulación no muestra el diagnóstico en la misma página', async ({ page }) => {
  await page.goto('/explore')
  await pickIndustry(page)

  await expect(page.getByText(`0 de ${QUESTION_COUNT} respondidas`)).toHaveCount(0)
  await expect(page.getByText(/Recomendación:/i)).toHaveCount(0)
})

test('la landing ofrece las dos entradas al producto', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('link', { name: /^Iniciar diagnóstico/ }).first()).toHaveAttribute('href', '/assessment')
  await expect(page.getByRole('link', { name: /Ver simulaciones primero/ }).first()).toHaveAttribute('href', '/explore')
})
