import { useEffect, useState } from "react"
import { db } from "./config/firebase";
import { addDoc, collection, collectionGroup, getDocs } from "firebase/firestore";

const App = () => {

  const [input, setInput] = useState({
    name: '', author: '', isBn: ''
  })

  const [books, setBooks] = useState([])

  const addBook = async () => {
    const bookdata = await addDoc(collection(db, "books"), input)
    fetchBook()
    setInput({ name: '', author: '', isBn: ''})
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

  useEffect(() => {
    fetchBook()
  }, [])

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

        <button onClick={addBook}>Add Book</button>

        {
          books.map((book) => {
            return <div key={book.id}>
              <h3>{book.name}</h3>
              <p>{book.author}</p>
              <p>{book.isBn}</p>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default App