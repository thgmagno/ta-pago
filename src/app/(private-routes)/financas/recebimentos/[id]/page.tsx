export default async function EditReceiptPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  return (
    <section>
      <p>EditReceiptPage</p>
      <p>Receipt {id}</p>
    </section>
  )
}
