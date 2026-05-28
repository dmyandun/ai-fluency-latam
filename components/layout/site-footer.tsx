export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} AI Fluency LATAM</p>
        <p>Diagnóstico de adopción de IA para Latinoamérica</p>
      </div>
    </footer>
  );
}
