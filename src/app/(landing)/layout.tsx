/**
 * Layout do grupo de rotas da landing.
 *
 * Mantém a landing isolada de futuras áreas autenticadas (ex.: dashboard,
 * área do aluno) sem afetar o root layout.
 */
export default function LandingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen text-white" style={{ backgroundColor: "#080D18" }}>
      {children}
    </main>
  );
}
