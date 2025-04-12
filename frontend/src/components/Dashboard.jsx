import { api } from '../utils/api';
import { useEffect, useState } from 'react';
import { FaTrashCan, FaPen } from "react-icons/fa6";

function Dashboard() {
  const [books, setBooks] = useState([]);

  useEffect(()=>{
     api.getBooks()
     .then((data)=>{
      console.log(data)
      setBooks(data.data);
     })
     .catch((error) => console.error("Erro ao buscar os livros:", error));
  }, []);

  return (
    <div>
         <table className='dashboard__table'>
          <thead>
            <tr>
              <th className='dashboard__table-head'>Título</th>
              <th className='dashboard__table-head'>Autor</th>
              <th className='dashboard__table-head'>Gênero</th>
              <th className='dashboard__table-head'>Ano</th>
              <th className='dashboard__table-head'>Cópias</th>
              <th className='dashboard__table-head'>Editar</th>
              <th className='dashboard__table-head'>Apagar</th>
            </tr>
          </thead>
          <tbody>
            {
              books.map((book)=>(
                <tr key={book._id}>
                   <td className='dashboard__table-cell'>{book.title}</td>
                   <td className='dashboard__table-cell'>{book.author}</td>
                   <td className='dashboard__table-cell'>{book.genre}</td>
                   <td className='dashboard__table-cell'>{book.publishedYear}</td>
                   <td className='dashboard__table-cell'>{book.avaliableCopies}</td>
                   <td className='dashboard__table-cell pointer'><FaPen /></td>
                   <td className='dashboard__table-cell pointer'><FaTrashCan /></td>

                </tr>
              ))
            }
          </tbody>
         </table>
    </div>
  )
}

export default Dashboard;