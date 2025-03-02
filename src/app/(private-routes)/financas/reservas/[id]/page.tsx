export default async function EditReservePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  return (
    <section>
      <p>EditReservePage</p>
      <p>Reserve {id}</p>
    </section>
  )
}
