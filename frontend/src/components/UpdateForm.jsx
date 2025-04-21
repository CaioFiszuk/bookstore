
function UpdateForm({submission, handleChange, updateFormData}) {

    const handleSubmit = (e) => {
      e.preventDefault();
  
      //const formData = new FormData(e.target);
      /*const data = {
        title: formData.get("title"),
        author: formData.get("author"),
        genre: formData.get("genre"),
        publishedYear: formData.get("publishedYear"),
        description: formData.get("description"),
      };*/
  
      submission(updateFormData);
    };
  
    return (
      <form className='form' onSubmit={handleSubmit}>
      <legend className='form__title'>Editar Livro</legend>
      <input type="text" name="title" placeholder='Título' className='form__input' value={updateFormData.title} onChange={handleChange}  required/>
      <input type="text" name="author" placeholder='Autor' className='form__input' value={updateFormData.author} onChange={handleChange} required/>
      <input type="text" name="genre" placeholder='Gênero' className='form__input' value={updateFormData.genre} onChange={handleChange} required/>
      <input type="number" name="publishedYear" placeholder='Ano' className='form__input' value={updateFormData.publishedYear} onChange={handleChange} required/>
      <textarea name="description" placeholder="Descrição" className="form__textArea" value={updateFormData.description} onChange={handleChange} required></textarea>
  
      <button 
        type='submit' 
        className='form__button'
      >
        Editar
      </button>
    </form>
    );
  }
  
  export default UpdateForm;