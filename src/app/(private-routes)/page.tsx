import { auth } from '@/auth'
import { getUserName } from '@/lib/utils'

export default async function IndexPage() {
  const user = await auth().then((session) => session?.user)

  return (
    <section className="page">
      <h2 className="text-muted-foreground text-lg font-semibold md:text-xl">
        {getUserName(user?.name)}
      </h2>
      <ul className="m-5 list-disc">
        <li>Saldo da conta</li>
        <li>Balanço mensal</li>
        <li>Total de transações (por categoria)</li>
      </ul>
    </section>
  )
}
