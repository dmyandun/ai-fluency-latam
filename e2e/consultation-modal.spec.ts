import { test, expect } from '@playwright/test'

/**
 * El diagnóstico ya no pregunta el país, pero para agendar sí importa: define la
 * zona horaria y el contexto de la reunión, y viaja en el resumen que se
 * pre-rellena en Calendly. Por eso aquí es obligatorio.
 */
test('la consultoría exige el país antes de agendar', async ({ page }) => {
  await page.goto('/explore')
  await page.getByRole('button', { name: 'Banca y Finanzas' }).click()
  await page.getByRole('button', { name: /Contactar consultoría/ }).first().click()

  const submit = page.getByRole('button', { name: /Continuar a agendar/ })
  await expect(submit).toBeDisabled()

  // Con actividad pero sin país sigue bloqueado: el país no es opcional.
  await page.getByPlaceholder(/Actividad 1/).fill('Revisar solicitudes de crédito')
  await page.getByRole('button', { name: /Solo IA/ }).first().click()
  await page.getByRole('button', { name: /Agregar/ }).first().click()
  await expect(submit).toBeDisabled()
  await expect(page.getByText('Elige tu país para continuar.')).toBeVisible()

  await page.getByLabel(/Tu país/).selectOption({ label: 'Perú' })
  await expect(submit).toBeEnabled()
})
