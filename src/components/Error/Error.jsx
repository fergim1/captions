export const Error = ({ error }) => {
  console.log(error)
  return (
    <div className="container-error">
      <p>Error: {error}</p>
    </div>
  )

}