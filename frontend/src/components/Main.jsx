import { useState } from 'react';
import PopUp from './Popup';

function Main({books}) {
 const [detailsModal, setDetailsModal] = useState(false);
 const [selectedBook, setSelectedBook] = useState(null);
 
 const openDetailsModal = (book) => {
  setSelectedBook(book);
  setDetailsModal(true);
 }

 const closeDetailsModal = () => {
  setDetailsModal(false);
 }

  return (
    <div>  
          <table className='dashboard__table'>
            <thead>
              <tr>
                <th className='dashboard__table-head'>Título</th>
                <th className='dashboard__table-head'>Autor</th>
                <th className='dashboard__table-head'> </th>
                <th className='dashboard__table-head'> </th>
              </tr>
            </thead>
            <tbody>
              {
                books.map((book)=>(
                  <tr key={book._id}>
                      <td className='dashboard__table-cell'>{book.title}</td>
                      <td className='dashboard__table-cell'>{book.author}</td>
                      <td><button className='details-button' onClick={()=>openDetailsModal(book)}>ver detalhes</button></td>
                      <td>Adicionar ao carrinho</td>
                  </tr>
                ))
              }
            </tbody>
          </table>  

          <PopUp isOpen={detailsModal} onClose={closeDetailsModal}>
            {
              selectedBook && (
                <div className='details-box'>
                <h2>{selectedBook.title}</h2>
                <h3>{selectedBook.author}</h3>
                <div>
                  <span>{selectedBook.genre} - </span>
                  <span>{selectedBook.publishedYear} - </span>
                  <span>{selectedBook.avaliableCopies} {selectedBook.avaliableCopies > 1 ? "cópias disponíveis" : "cópia disponível"}</span>
                </div>
                <p>{selectedBook.description}</p>
                 
                <button className='cart-button'>Adicionar ao carrinho</button>
               </div>
              )
            }
          </PopUp>
    </div>
  )
}

export default Main;
