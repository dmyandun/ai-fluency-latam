import type { AssessmentResult } from '@/types/assessment'
import { MODEL_LABELS } from '@/lib/recommendations'
import { resolveLocationName } from '@/lib/countries'
import { INDUSTRIES } from '@/lib/industries'

export interface PolicySection {
  id: string
  title: string
  content: string[]
}

export interface AIPolicy {
  companyName: string
  date: string
  result: AssessmentResult
  sections: PolicySection[]
}

export function generateAIPolicy(
  result: AssessmentResult,
  companyName: string
): AIPolicy {
  const country  = resolveLocationName(result.country)
  const industry = INDUSTRIES.find((i) => i.id === result.industry)?.label ?? result.industry
  const modelLabel = MODEL_LABELS[result.interactionModel] ?? result.interactionModel
  const implLabel  = MODEL_LABELS[result.implementationType] ?? result.implementationType

  // Contenido dinámico según modelo de interacción
  const delegationRules: string[] = {
    automation: [
      'La IA puede ejecutar de forma autónoma tareas operativas repetitivas y de bajo riesgo previamente catalogadas.',
      'Cualquier tarea no catalogada como automatizable requiere aprobación humana antes de ser delegada a la IA.',
      'Los resultados de procesos automatizados deben ser auditables y contar con logs de ejecución.',
    ],
    agency: [
      'Los agentes de IA pueden tomar decisiones intermedias dentro de los flujos de trabajo definidos, pero deben escalar decisiones críticas al humano responsable.',
      'Cada agente activo debe tener un propietario humano designado que responda por su comportamiento.',
      'El alcance de acción de cada agente debe estar documentado y limitado al mínimo necesario para su función.',
    ],
    augmentation: [
      'La IA actúa como copiloto del experto humano — las decisiones finales siempre las toma el humano.',
      'El uso de IA para tareas de alta complejidad o alto impacto requiere que el profesional valide explícitamente el output antes de usarlo.',
      'La IA no reemplaza el criterio experto — lo amplifica. La responsabilidad profesional permanece en el humano.',
    ],
  }[result.interactionModel] ?? []

  const privacyRules: string[] = result.dimensions.dataPrivacy >= 4 ? [
    'Ningún dato sensible, confidencial o personal identificable puede ser enviado a modelos de IA externos (APIs de terceros) sin cifrado, anonimización previa o autorización explícita del área legal.',
    'El uso de IA generativa local (on-premise) es obligatorio para el procesamiento de datos de categoría sensible.',
    'Los empleados deben completar una capacitación de privacidad de datos en IA antes de usar herramientas de IA con acceso a información de clientes.',
  ] : [
    'Los datos internos no públicos no deben incluirse en prompts de herramientas de IA externas sin evaluar la política de privacidad del proveedor.',
    'Información competitiva, financiera no publicada o datos de clientes individualizados no debe compartirse con servicios de IA en la nube.',
  ]

  const regulatoryRules: string[] = result.dimensions.regulatorySensitivity >= 4 ? [
    `Dado que ${industry} opera bajo marcos regulatorios estrictos, el uso de IA en procesos regulados requiere aprobación del área de Compliance antes de su implementación.`,
    'Cualquier decisión tomada con asistencia de IA que pueda ser auditada por reguladores debe ser documentada con el razonamiento humano que la respaldó.',
    'La empresa debe mantener un registro actualizado de todos los sistemas de IA en uso y su propósito, disponible para auditorías regulatorias.',
  ] : [
    'El área de Compliance debe ser informada de nuevos usos de IA que involucren datos de clientes o decisiones con impacto legal.',
  ]

  const sections: PolicySection[] = [
    {
      id: 'purpose',
      title: '1. Propósito y alcance',
      content: [
        `Esta política establece los principios, reglas y responsabilidades para el uso de inteligencia artificial (IA) en ${companyName}, una empresa del sector de ${industry} en ${country}.`,
        `Aplica a todos los colaboradores, contratistas y proveedores que utilicen herramientas de IA en nombre de la empresa.`,
        `La política está alineada con el AI Fluency Framework de Anthropic (Delegation, Description, Discernment, Diligence) y con el modelo de adopción de IA recomendado para la organización: ${modelLabel} con implementación basada en ${implLabel}.`,
      ],
    },
    {
      id: 'principles',
      title: '2. Principios rectores',
      content: [
        'Efectividad: el uso de IA debe producir resultados de mayor calidad o eficiencia que los procesos anteriores.',
        'Responsabilidad: todo output generado por IA que se use en el trabajo es responsabilidad del colaborador que lo incorporó.',
        'Transparencia: cuando un entregable fue producido con asistencia significativa de IA, debe declararse al cliente, usuario o receptor cuando sea relevante.',
        'Supervisión humana: la IA asiste y amplifica — no reemplaza el juicio humano en decisiones de alto impacto.',
        'Mejora continua: el equipo debe documentar errores y aprendizajes del sistema para mejorar su uso colectivo.',
      ],
    },
    {
      id: 'delegation',
      title: '3. Delegación — qué tareas se pueden delegar a la IA',
      content: [
        ...delegationRules,
        'Cada equipo debe mantener un catálogo actualizado de tareas aprobadas para delegación a IA, clasificadas por nivel de autonomía: Solo IA / Humano + IA / Solo humano.',
      ],
    },
    {
      id: 'description',
      title: '4. Descripción — cómo comunicarse con la IA',
      content: [
        'Los colaboradores deben proveer contexto suficiente en sus prompts: quién eres, qué necesitas, para qué audiencia, en qué formato y con qué restricciones.',
        'No se debe asumir que la IA conoce el contexto de la empresa — el contexto relevante debe incluirse explícitamente en cada interacción.',
        'Los prompts que producen resultados de alta calidad deben documentarse en la biblioteca compartida del equipo para reutilización.',
        'Está prohibido incluir datos confidenciales, contraseñas, claves de API o información de acceso en prompts de IA.',
      ],
    },
    {
      id: 'discernment',
      title: '5. Discernimiento — cómo evaluar los outputs',
      content: [
        'Todo output de IA debe ser revisado por un humano antes de ser usado en contextos de impacto: comunicaciones externas, decisiones de negocio, documentos legales o entregables de cliente.',
        'Los colaboradores deben verificar hechos, cifras y referencias que la IA incluya en sus respuestas — la IA puede generar información incorrecta con apariencia de veracidad.',
        'Cuando un output de IA sea rechazado por baja calidad, el colaborador debe documentar el caso para mejorar los prompts del equipo.',
        'Criterios mínimos de evaluación para outputs de IA: precisión factual, tono apropiado, completitud, ausencia de sesgos evidentes y adecuación al contexto.',
      ],
    },
    {
      id: 'privacy',
      title: '6. Privacidad y protección de datos',
      content: privacyRules,
    },
    {
      id: 'regulatory',
      title: '7. Cumplimiento regulatorio',
      content: regulatoryRules,
    },
    {
      id: 'diligence',
      title: '8. Diligencia — uso ético y responsable',
      content: [
        'Los colaboradores no deben usar IA para generar contenido engañoso, difamatorio, discriminatorio o que viole derechos de terceros.',
        'El uso de IA para crear contenido que se presente como producido enteramente por humanos cuando el destinatario tiene expectativa de autoría humana (ej: trabajos académicos, certifcaciones) está prohibido.',
        'Cualquier comportamiento inesperado, sesgado o potencialmente dañino de un sistema de IA debe reportarse al responsable de IA de la empresa dentro de 24 horas.',
        'La empresa realizará una auditoría semestral de los sistemas de IA en uso para verificar cumplimiento de esta política.',
      ],
    },
    {
      id: 'governance',
      title: '9. Gobernanza y responsabilidades',
      content: [
        'Responsable de IA: designar un responsable de IA (o equipo) que mantenga esta política actualizada, gestione el catálogo de herramientas aprobadas y responda consultas del equipo.',
        'Líderes de equipo: asegurar que sus equipos conozcan y apliquen esta política. Aprobar nuevas herramientas de IA antes de su adopción.',
        'Todos los colaboradores: completar la capacitación de AI Fluency (4D Framework) en los primeros 60 días de adopción. Reportar incidentes. Seguir las reglas de delegación, descripción, discernimiento y diligencia.',
        'Esta política debe revisarse y actualizarse al menos cada 12 meses, dado el ritmo de evolución de la tecnología de IA.',
      ],
    },
    {
      id: 'enforcement',
      title: '10. Cumplimiento y consecuencias',
      content: [
        'El incumplimiento de esta política puede resultar en restricción del acceso a herramientas de IA, medidas disciplinarias o, en casos graves, acciones legales.',
        'Los incidentes serán evaluados caso a caso considerando intencionalidad, impacto y contexto.',
        'La empresa adoptará un enfoque de mejora continua ante los primeros incumplimientos: capacitación y corrección antes que sanción.',
      ],
    },
  ]

  return {
    companyName,
    date: new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
    result,
    sections,
  }
}

export function formatPolicyAsText(policy: AIPolicy): string {
  const lines: string[] = [
    '╔══════════════════════════════════════════════════════════════╗',
    `║  POLÍTICA DE USO DE INTELIGENCIA ARTIFICIAL                  ║`,
    `║  ${policy.companyName.padEnd(60).slice(0, 60)}║`,
    '╚══════════════════════════════════════════════════════════════╝',
    '',
    `Fecha de emisión: ${policy.date}`,
    `Basada en: AI Fluency Framework — Anthropic (Feller & Dakan)`,
    '',
    '═'.repeat(64),
    '',
  ]

  for (const section of policy.sections) {
    lines.push(section.title.toUpperCase())
    lines.push('─'.repeat(60))
    for (const item of section.content) {
      lines.push(`  • ${item}`)
    }
    lines.push('')
  }

  lines.push('═'.repeat(64))
  lines.push(`Generado por AI Fluency LATAM · aifluencylatam.com`)
  lines.push(`Documento de referencia — debe ser revisado por el área legal antes de su implementación formal.`)

  return lines.join('\n')
}
