export default function LoginPage() {
  return (
    <section className="py-16 md:py-32">
      <h1 className="text-6xl tracking-tighter text-balance md:text-8xl">
        <TaPago />
      </h1>
      <article className="mt-12 flex max-w-3xl flex-col space-y-4 text-lg text-zinc-500 md:text-xl">
        <p>
          Organize suas finanças de forma simples e eficiente com o {<TaPago />}
        </p>
        <p>
          Controle seus gastos, faça orçamentos, acompanhe seus pagamentos e
          evite surpresas no fim do mês.
        </p>
        <p>
          Tudo isso em um app fácil de usar e com aquele toque de praticidade
          que você precisa para ter o total domínio sobre sua grana, com o{' '}
          {<TaPago />} você sabe que está no controle!
        </p>
      </article>
    </section>
  )
}

function TaPago() {
  return (
    <>
      <span className="font-semibold dark:text-white">Tá</span>
      <span className="font-semibold text-emerald-500">Pago!</span>
    </>
  )
}
