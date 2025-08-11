import { useEffect, useState } from "react"
import { db } from "./config/firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

const App = () => {

  const [input, setInput] = useState({
    name: '', author: '', isBn: ''
  })
  const [books, setBooks] = useState([])
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBook()
  }, [])

  const addBook = async () => {
    const bookdata = await addDoc(collection(db, "books"), input)
    fetchBook()
    setInput({ name: '', author: '', isBn: '' })
  }

  const fetchBook = async () => {
    const readBooks = await getDocs(collection(db, "books"))
    let arr = readBooks.docs.map((book) => {
      return {
        id: book.id,
        ...book.data()
      }
    })
    setBooks(arr);
  };

  const deleteBook = async (id) => {
    try {
      await deleteDoc(doc(db, "books", id))
      fetchBook();
    } catch (err) {
      console.log(err);
    }
  }

  const editedBook = async () => {
    try {
      await updateDoc(doc(db, "books", editId), input)
      fetchBook();
      setInput({ name: '', author: '', isBn: '' })
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <div>
      <div>
        <label htmlFor="name">Name :</label>
        <input type="text" id="name" value={input.name} onChange={(e) => { setInput({ ...input, [e.target.id]: e.target.value }) }} />
        <br /><br />
        <label htmlFor="author">Author :</label>
        <input type="text" id="author" value={input.author} onChange={(e) => { setInput({ ...input, [e.target.id]: e.target.value }) }} />
        <br /><br />
        <label htmlFor="number">IsBn :</label>
        <input type="number" id="isBn" value={input.isBn} onChange={(e) => { setInput({ ...input, [e.target.id]: e.target.value }) }} />

        <br /><br />

        <button onClick={editId ? editedBook : addBook}>{editId ? "update" : "Add"} Book</button>

        <table border="2" cellPadding={10} width={500}>
          <thead>
            <tr>
              <th>No </th>
              <th>Name</th>
              <th>Author </th>
              <th>ISBN </th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {
              books.map((book, idx) => {
                return <tr key={book.id}>
                  <td>{idx + 1}</td>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{book.isBn}</td>
                  <td>
                    <button onClick={() => {
                      setEditId(book.id);
                      const { id, ...data } = book
                      setInput(data)
                      console.log(id, data)
                    }}>edit</button>
                    <button onClick={() => deleteBook(book.id)}>delete</button>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App