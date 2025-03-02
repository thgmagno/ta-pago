export default async function EditPaymentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  return (
    <section>
      <p>EditPaymentPage</p>
      <p>Payment {id}</p>
    </section>
  )
}
