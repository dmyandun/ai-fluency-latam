import Link from 'next/link'
import Brandmark from '@/components/Brandmark'

const EFFECTIVE_DATE = '28 de mayo de 2026'
const CONTACT_EMAIL = 'dyandun@outlook.com'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Brandmark />
          <Link
            href="/assessment"
            className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Iniciar diagnóstico
          </Link>
        </div>
      </nav>

      {/* Contenido */}
      <main className="flex-1 px-6 py-16 w-full">
        <article className="max-w-3xl mx-auto">
          <header className="mb-12">
            <span className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
              Transparencia y privacidad
            </span>
            <h1 className="text-3xl sm:text-4xl font-semibold text-white leading-tight tracking-tight mb-4">
              Política de Privacidad
            </h1>
            <p className="text-gray-400">
              Fecha de vigencia: <span className="text-gray-300">{EFFECTIVE_DATE}</span>
            </p>
          </header>

          <div className="space-y-12 text-gray-300 leading-relaxed">
            {/* Resumen */}
            <section className="bg-gray-900 border border-emerald-500/30 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-3">Resumen en una línea</h2>
              <p className="text-gray-300">
                AI Fluency LATAM <strong className="text-white">no recopila datos personales</strong>{' '}
                ni los envía a ningún servidor. Toda la información de tu diagnóstico se guarda{' '}
                <strong className="text-white">únicamente en tu navegador</strong> (almacenamiento
                local) y permanece bajo tu control.
              </p>
            </section>

            {/* 1 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Quiénes somos</h2>
              <p className="mb-3">
                AI Fluency LATAM es una herramienta web gratuita de diagnóstico de adopción de
                inteligencia artificial, dirigida a organizaciones de América Latina. La aplicación
                te formula un conjunto de preguntas sobre el contexto de tu organización y, a partir
                de tus respuestas, genera recomendaciones y un roadmap personalizado.
              </p>
              <p>
                Responsable del proyecto y del tratamiento de datos:{' '}
                <strong className="text-white">Daniel Yandun</strong>. Para cualquier consulta sobre
                privacidad puedes escribir a{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-400 hover:text-indigo-300">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Qué información recopilamos</h2>
              <p className="mb-4">
                Es importante distinguir entre los datos que se procesan en tu propio dispositivo y
                los que se envían a un servidor. En AI Fluency LATAM,{' '}
                <strong className="text-white">no se envía ningún dato a servidores propios.</strong>
              </p>

              <h3 className="text-base font-semibold text-white mb-2">
                Datos que se procesan y guardan localmente (en tu navegador)
              </h3>
              <p className="mb-3">
                Cuando completas el diagnóstico, la aplicación almacena información exclusivamente en
                el almacenamiento local (<code className="text-indigo-300">localStorage</code>) de tu
                navegador, en tu propio dispositivo:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-gray-400">
                <li>
                  <code className="text-indigo-300">afl_result</code>: tus respuestas a las preguntas
                  del diagnóstico (sobre el contexto de tu organización) y los puntajes calculados a
                  partir de ellas.
                </li>
                <li>
                  <code className="text-indigo-300">afl_roadmap</code>: el roadmap generado para ti,
                  incluyendo cualquier edición que realices sobre él.
                </li>
              </ul>
              <p className="mb-4 text-gray-400">
                Estos datos <strong className="text-white">nunca salen de tu dispositivo</strong>: no
                se transmiten, no los recibimos ni podemos verlos. Permanecen en tu navegador hasta
                que tú los elimines.
              </p>

              <h3 className="text-base font-semibold text-white mb-2">
                Datos personales identificables
              </h3>
              <p className="mb-4 text-gray-400">
                La aplicación <strong className="text-white">no solicita ni recopila</strong> nombre,
                correo electrónico, teléfono, identificación de la empresa ni ningún otro dato que te
                identifique personalmente. No existe registro ni inicio de sesión.
              </p>

              <h3 className="text-base font-semibold text-white mb-2">Datos técnicos</h3>
              <p className="text-gray-400">
                La aplicación está desplegada en Hugging Face Spaces. Como ocurre con cualquier sitio
                web, el proveedor de la infraestructura de alojamiento puede registrar de forma
                automática datos técnicos básicos (como la dirección IP o el tipo de navegador) con
                fines de operación y seguridad del servicio. Ese tratamiento se rige por las
                políticas de privacidad de dicho proveedor y queda fuera de nuestro control directo.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Cómo usamos la información</h2>
              <p className="mb-3">
                La información guardada en tu navegador se utiliza con una única finalidad: permitir
                que la aplicación funcione para ti. En concreto:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-gray-400">
                <li>Calcular las recomendaciones y el roadmap a partir de tus respuestas.</li>
                <li>
                  Mostrar tus resultados en la página de resultados sin que tengas que repetir el
                  diagnóstico.
                </li>
                <li>Conservar las ediciones que hagas sobre tu roadmap.</li>
              </ul>
              <p className="text-gray-400">
                Dado que los datos no se transmiten ni se almacenan en nuestros sistemas, no los
                usamos para perfilado, publicidad, venta a terceros ni ninguna otra finalidad. La
                base legal para este procesamiento local es la ejecución del servicio que solicitas
                voluntariamente al usar la herramienta.
              </p>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Almacenamiento y seguridad</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-400">
                <li>
                  <strong className="text-white">Dónde viven los datos:</strong> exclusivamente en el
                  almacenamiento local de tu navegador, en tu dispositivo.
                </li>
                <li>
                  <strong className="text-white">Por cuánto tiempo:</strong> permanecen hasta que tú
                  los elimines (borrando los datos del sitio en tu navegador) o reinicies el
                  diagnóstico.
                </li>
                <li>
                  <strong className="text-white">Cómo se protegen:</strong> al no transmitirse a
                  ningún servidor, no existe riesgo de intercepción en tránsito ni de filtración
                  desde una base de datos central. La seguridad depende principalmente del acceso
                  físico y lógico a tu propio dispositivo y navegador.
                </li>
              </ul>
              <p className="mt-4 text-gray-400">
                Ten en cuenta que si usas un dispositivo compartido o público, otra persona con
                acceso a ese navegador podría ver los datos guardados localmente. Te recomendamos
                borrar los datos del sitio si usas un equipo que no es de tu uso exclusivo.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                5. Compartir información con terceros
              </h2>
              <p className="mb-3 text-gray-400">
                No compartimos, vendemos ni cedemos tus datos a terceros, porque sencillamente no los
                recibimos ni los almacenamos. La aplicación no integra servicios de analítica (como
                Google Analytics), píxeles de seguimiento (como Meta Pixel) ni publicidad.
              </p>
              <p className="text-gray-400">
                El único tercero involucrado es el proveedor de alojamiento (Hugging Face Spaces),
                que opera la infraestructura donde se sirve la aplicación y puede tratar datos
                técnicos según se describe en la sección 2.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Tus derechos</h2>
              <p className="mb-3 text-gray-400">
                Como usuario en América Latina, las normativas aplicables (por ejemplo, la Ley 1581
                de 2012 en Colombia, la Ley Federal de Protección de Datos Personales en México, la
                LGPD en Brasil o la Ley de Protección de Datos en Chile) te reconocen los derechos
                ARCO: <strong className="text-white">Acceso, Rectificación, Cancelación y Oposición</strong>.
                Si te encuentras en la Unión Europea, el RGPD/GDPR añade derechos como la
                portabilidad y la limitación del tratamiento.
              </p>
              <p className="mb-3 text-gray-400">
                Dado el diseño de la aplicación, puedes ejercer la mayoría de estos derechos de forma
                inmediata y autónoma, sin intermediarios:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-gray-400">
                <li>
                  <strong className="text-white">Acceso:</strong> tus datos son visibles en la página
                  de resultados; también puedes inspeccionar el{' '}
                  <code className="text-indigo-300">localStorage</code> desde las herramientas de tu
                  navegador.
                </li>
                <li>
                  <strong className="text-white">Rectificación:</strong> puedes editar tu roadmap o
                  repetir el diagnóstico en cualquier momento.
                </li>
                <li>
                  <strong className="text-white">Cancelación (supresión):</strong> borra los datos
                  del sitio en tu navegador para eliminar por completo la información almacenada.
                </li>
                <li>
                  <strong className="text-white">Oposición:</strong> deja de usar la herramienta; no
                  realizamos ningún tratamiento posterior con tus datos.
                </li>
              </ul>
              <p className="text-gray-400">
                Si tienes dudas o deseas presentar una consulta sobre tus derechos, escribe a{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-400 hover:text-indigo-300">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                7. Cookies y tecnologías de seguimiento
              </h2>
              <p className="mb-3 text-gray-400">
                AI Fluency LATAM{' '}
                <strong className="text-white">no utiliza cookies de seguimiento ni de publicidad</strong>,
                y no emplea herramientas de analítica de terceros.
              </p>
              <p className="text-gray-400">
                La aplicación usa el almacenamiento local del navegador (
                <code className="text-indigo-300">localStorage</code>), que es una tecnología
                estrictamente funcional: sirve para guardar tu diagnóstico en tu propio dispositivo y
                no permite rastrearte entre sitios. No es una cookie de seguimiento.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Cambios a esta política</h2>
              <p className="mb-3 text-gray-400">
                Podemos actualizar esta política para reflejar mejoras en la aplicación o cambios
                normativos. Cualquier versión revisada se publicará en esta misma página con una
                nueva fecha de vigencia.
              </p>
              <p className="text-gray-400">
                En particular, algunas funcionalidades previstas a futuro (como inicio de sesión,
                guardado de diagnósticos en una base de datos, historial por organización o compartir
                resultados mediante un enlace) implicarían el tratamiento de datos en servidores.{' '}
                <strong className="text-white">
                  Si se incorporan esas funciones, esta política se actualizará
                </strong>{' '}
                de forma destacada antes o en el momento de su lanzamiento, detallando qué datos se
                recopilan, con qué base legal y cómo se protegen.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">9. Contacto</h2>
              <p className="text-gray-400">
                Para ejercer tus derechos, resolver dudas o presentar una consulta sobre esta
                política de privacidad, contáctanos en:
              </p>
              <p className="mt-3">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </section>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span>
            AI Fluency <span className="text-indigo-400">LATAM</span> — Diagnóstico de adopción de IA
          </span>
          <Link href="/" className="hover:text-gray-300 transition-colors">
            Volver al inicio
          </Link>
        </div>
      </footer>
    </div>
  )
}
