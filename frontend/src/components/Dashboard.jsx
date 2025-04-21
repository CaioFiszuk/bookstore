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
  const [updateModal, setUpdateModal] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publishedYear: '',
    description: ''
  });

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

  const openUpdateModal = (book) => {
    setSelectedBook(book);
    setUpdateFormData({
     title: book.title,
     author: book.author,
     genre: book.genre,
     publishedYear: book.publishedYear,
     description: book.description,
   });
    setUpdateModal(true);
 }

 const closeUpdateModal = () => {
   setUpdateModal(false);
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

  const handleUpdateFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    if (!selectedBook) return;
  
    try {
      const response = await api.updateBook(selectedBook._id, updateFormData);
      const updatedBook = response.data;
      console.log(response.data)
      setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === selectedBook._id ? updatedBook : book
          )
      );
      closeUpdateModal();
    } catch (error) {
      console.error("Erro ao atualizar: ", error);
    }
  }

  useEffect(()=>{
     api.getBooks()
     .then((data)=>{
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
                   <td className='dashboard__table-cell pointer'><FaPen onClick={()=>openUpdateModal(book)}/></td>
                   <td className='dashboard__table-cell pointer'><FaTrashCan onClick={()=>openDeleteModal(book)}/></td>

                </tr>
              ))
            }
          </tbody>
         </table>

         <Popup isOpen={createModal} onClose={closeCreateModal}>
           <CreateForm submission={handleCreateBook}/>
         </Popup>

         <Popup isOpen={updateModal} onClose={closeUpdateModal}>
           <form className='form' onSubmit={handleUpdateBook}>
             <legend className='form__title'>Editar Livro</legend>
             <input type="text" name="title" placeholder='Título' className='form__input' value={updateFormData.title} onChange={handleUpdateFormChange}  required/>
             <input type="text" name="author" placeholder='Autor' className='form__input' value={updateFormData.author} onChange={handleUpdateFormChange} required/>
             <input type="text" name="genre" placeholder='Gênero' className='form__input' value={updateFormData.genre} onChange={handleUpdateFormChange} required/>
             <input type="number" name="publishedYear" placeholder='Ano' className='form__input' value={updateFormData.publishedYear} onChange={handleUpdateFormChange} required/>
             <textarea name="description" placeholder="Descrição" className="form__textArea" value={updateFormData.description} onChange={handleUpdateFormChange} required></textarea>
  
             <button 
               type='submit' 
               className='form__button'
              >
                Editar
              </button>
           </form>
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