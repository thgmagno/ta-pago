import { auth } from '@/auth'

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

function getUserName(username?: string | null) {
  if (!username) return 'Olá'
  const nameSplited = username.split(' ')
  const firstName = nameSplited.shift()
  const lastName = nameSplited.slice(1).pop()
  return `${firstName} ${lastName || ''}`.trim()
}
