
function CreateForm({submission}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      title: formData.get("title"),
      author: formData.get("author"),
      genre: formData.get("genre"),
      publishedYear: formData.get("publishedYear"),
      description: formData.get("description"),
    };

    submission(data);
    e.target.reset();
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
    <legend className='form__title'>Registrar Livro</legend>
    <input type="text" name="title" placeholder='Título' className='form__input' required/>
    <input type="text" name="author" placeholder='Autor' className='form__input' required/>
    <input type="text" name="genre" placeholder='Gênero' className='form__input' required/>
    <input type="number" name="publishedYear" placeholder='Ano' className='form__input' required/>
    <textarea name="description" placeholder="Descrição" className="form__textarea" required></textarea>

    <button 
      type='submit' 
      className='form__button'
    >
      Registrar
    </button>
  </form>
  );
}

export default CreateForm;