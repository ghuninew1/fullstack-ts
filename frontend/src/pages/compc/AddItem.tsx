
const AddItem = props => {
  return (
    <div>
        <form className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
        </form>
    </div>
  )
}


export default AddItem