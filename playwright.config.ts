import { defineConfig, devices } from '@playwright/test'

const PORT = 3100
const BASE_URL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: './e2e',
  // El flujo completo son 13 preguntas más navegación: dar aire sin ocultar cuelgues.
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  // En CI: anotaciones en el diff (github) + informe navegable que se sube como
  // artefacto, con las trazas del reintento.
  reporter: process.env.CI
    ? [['github'], ['html', { open: 'never' }]]
    : [['list']],
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  // Se prueba contra un build de producción, no contra `next dev`.
  // next.config usa output: 'standalone' y `next start` avisa de ello, pero sirve
  // la app correctamente; el servidor standalone requeriría copiar .next/static y
  // public a mano, como hace el Dockerfile, y eso no es portable entre shells.
  webServer: {
    command: `npm run build && npm run start -- --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
})
