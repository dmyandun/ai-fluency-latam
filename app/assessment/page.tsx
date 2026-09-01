import { Suspense } from 'react'
import AssessmentFlow from '@/components/AssessmentFlow'

export default function AssessmentPage() {
  /* AssessmentFlow lee la industria de la query: Next exige el límite de Suspense. */
  return (
    <Suspense>
      <AssessmentFlow />
    </Suspense>
  )
}
