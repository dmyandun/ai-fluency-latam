import { test, expect, type Page } from '@playwright/test'
import { QUESTION_COUNT, answerAllQuestions, pickIndustry } from './helpers'

/**
 * El roadmap se lee como una línea de hitos: en el gráfico sólo van los títulos
 * y el detalle editable vive debajo, en la ficha del hito abierto.
 */
async function openRoadmap(page: Page) {
  await page.goto('/assessment')
  await pickIndustry(page)
  await page.getByRole('button', { name: /Continuar/ }).click()
  expect(await answerAllQuestions(page)).toBe(QUESTION_COUNT)
  await page.getByRole('button', { name: /Ver mis resultados/ }).click()
  await page.getByRole('button', { name: 'Roadmap 12 meses' }).click()
  await expect(page.getByText('D1 · Delegation').first()).toBeVisible()
}

test('la línea muestra un hito por actividad', async ({ page }) => {
  await openRoadmap(page)

  // 25 items: 18 universales + 4 del modelo ganador + 3 del tipo de implementación.
  await expect(page.locator('button[aria-expanded]')).toHaveCount(25)
})

test('sólo se abre un hito a la vez', async ({ page }) => {
  await openRoadmap(page)

  const milestones = page.locator('button[aria-expanded]')
  await milestones.first().click()
  await expect(page.locator('button[aria-expanded="true"]')).toHaveCount(1)

  await milestones.nth(4).click()
  await expect(page.locator('button[aria-expanded="true"]')).toHaveCount(1)

  // El segundo clic sobre el mismo hito lo cierra.
  await milestones.nth(4).click()
  await expect(page.locator('button[aria-expanded="true"]')).toHaveCount(0)
})

test('el detalle se edita desde la ficha y persiste', async ({ page }) => {
  await openRoadmap(page)

  await page.locator('button[aria-expanded]').first().click()
  const title = page.getByRole('textbox').first()
  await title.fill('Hito renombrado por el usuario')

  await page.reload()
  await page.getByRole('button', { name: 'Roadmap 12 meses' }).click()
  await expect(page.getByText('Hito renombrado por el usuario').first()).toBeVisible()
})
