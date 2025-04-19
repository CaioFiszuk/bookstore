import { api } from '../utils/api';
import { useEffect, useState } from 'react';
import { FaTrashCan, FaPen } from "react-icons/fa6";
import Popup from './Popup';
import CreateForm from './CreateForm';

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleOpenCreateModal = () => {
    setCreateModal(true);
  }

  const closeCreateModal = () => {
    setCreateModal(false);
  }

  const openDeleteModal = (product) => {
    setSelectedBook(product);
    setDeleteModal(true);
  }

  const closeDeleteModal = () => {
    setDeleteModal(false);
  }

  const handleCreateBook = async (data) => {
    try {
      const newBook = await api.createBook(data);
      setBooks(prevBooks => [...prevBooks, newBook.data]);
      closeCreateModal();
    }
    catch(error) {
      console.error(error);
    }
  }

  const handleDeleteBook = async () => {
    if(!selectedBook) return;

    try {
      await api.deleteBook(selectedBook._id);
      setBooks(books.filter((v)=>v._id !== selectedBook._id));
      closeDeleteModal();
      setSelectedBook(null);
    }
    catch(error) {
      console.error(error);
    }
  }

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
      <button onClick={handleOpenCreateModal}>Registrar Livro</button>

         <table className='dashboard__table'>
          <thead>
            <tr>
              <th className='dashboard__table-head'>Título</th>
              <th className='dashboard__table-head'>Autor</th>
              <th className='dashboard__table-head'>Gênero</th>
              <th className='dashboard__table-head'>Ano</th>
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
                   <td className='dashboard__table-cell pointer'><FaPen /></td>
                   <td className='dashboard__table-cell pointer'><FaTrashCan onClick={()=>openDeleteModal(book)}/></td>

                </tr>
              ))
            }
          </tbody>
         </table>

         <Popup isOpen={createModal} onClose={closeCreateModal}>
           <CreateForm submission={handleCreateBook}/>
         </Popup>

        <Popup isOpen={deleteModal} onClose={closeDeleteModal}>
           <h3 className='form__title'>Tem certeza?</h3>
            <div className='form__button-box'>
              <button className='form__button form__button-success' onClick={handleDeleteBook}>Sim</button>
              <button className='form__button form__button-danger' onClick={closeDeleteModal}>Não</button>
            </div>
        </Popup>
    </div>
  )
}

export default Dashboard;