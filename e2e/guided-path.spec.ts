import { test, expect } from '@playwright/test'
import { QUESTION_COUNT, answerAllQuestions, expectRecommendation, pickCountryAndIndustry } from './helpers'

/**
 * Camino guiado: /explore usa las simulaciones para despertar curiosidad y de ahí
 * lleva al diagnóstico, al roadmap y a la política, todo en una sola página.
 */
test('la simulación se puede saltar para ir directo al diagnóstico', async ({ page }) => {
  await page.goto('/explore')
  await pickCountryAndIndustry(page)

  // La salida existe justo donde se elige el contexto, sin scroll por la simulación.
  await page.getByRole('button', { name: /Saltar al diagnóstico/ }).click()

  await expect(page.getByText(`0 de ${QUESTION_COUNT} respondidas`)).toBeVisible()
})

test('de las simulaciones al roadmap y a la política de IA', async ({ page }) => {
  await page.goto('/explore')
  await pickCountryAndIndustry(page)

  await page.getByRole('button', { name: /Saltar al diagnóstico/ }).click()
  expect(await answerAllQuestions(page)).toBe(QUESTION_COUNT)

  await page.getByRole('button', { name: /Ver resultados/ }).click()
  await expectRecommendation(page)

  // Las dos secciones que la landing promete y que sólo aparecen tras el resultado.
  await page.getByRole('button', { name: /Generar Roadmap 4D/ }).click()
  await expect(page.getByText('D1 · Delegation', { exact: false }).first()).toBeVisible()

  await page.getByRole('button', { name: /Preparar generador de política/ }).click()
  await expect(page.getByText(/nombre de la empresa/i).first()).toBeVisible()
})

test('la landing ofrece las dos entradas al producto', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('link', { name: /^Iniciar diagnóstico/ }).first()).toHaveAttribute('href', '/assessment')
  await expect(page.getByRole('link', { name: /Ver simulaciones primero/ }).first()).toHaveAttribute('href', '/explore')
})
