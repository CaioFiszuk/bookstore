
function Main({books}) {

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
                         <td>Ver Detalhes</td>
                         <td>Adicionar ao carrinho</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
        
    </div>
  )
}

export default Main;
