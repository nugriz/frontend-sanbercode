"use client";

import Image from "next/image";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from 'axios'

export default function Home() {
  // variable
  const [login, setLogin] = useState(true)
  const [auth, setAuth] = useState(false)
  const [categories, setCategories] = useState()
  const [books, setBooks] = useState()
  const [addCategory, setAddCategory] = useState(false)
  const [byCategory, setByCategory] = useState(false)
  const [editCategory, setEditCategory] = useState(false)
  const [postBook, setPostBook] = useState(false)
  const [editBook, setEditBook] = useState(false)
  const [error, setError] = useState(false)
  const url = 'https://stormy-ravine-08943-eddafa52ea6f.herokuapp.com/api/'
  const header = {
    'content-type': 'application/json',
    Authorization: `Bearer ${auth}`
  }

  // initialization
  useEffect(() => { 
    const urls = url + 'categories'
    const headers = {
      'content-type': 'application/json',
      Authorization: `Bearer 70|S0szjdEjTwEFjt9D4gu0Qr66bgpruivVYuUgnWid`
    }
    axios.get(urls, {headers: headers}).then((response) => {
      setCategories(response.data)
    })

    const urlss = url + 'books'
    axios.get(urlss, {headers: headers}).then((response) => {
      setBooks(response.data)
    })
 }, [])

  // function
  function authorize(){
    const urls = login ? (url + 'login') : url + 'register'
    const data = {
      name: document.getElementsByClassName('form-control')[0].value,
      email: document.getElementsByClassName('form-control')[1].value,
      password: document.getElementsByClassName('form-control')[2].value
    }
    axios.post(urls, data, {headers: header}).then((response) => {
      response.data.access_token ? setAuth(response.data.access_token) : setError(true)
    }, (err) => {
      setError(true)
    })
  }

  function getCategories(id){
    const urls = url + `categories`
    axios.get(urls, {headers: header}).then((response) => {
      setCategories(response.data)
    })
  }

  function getBooks(){
    const urls = url + `books`
    axios.get(urls, {headers: header}).then((response) => {
      setBooks(response.data)
    })
  }

  function getBooksByCategory(category){
    const urlss = url + `categories/${category.id}/books`
    axios.get(urlss, {headers: header}).then((response) => {
      setByCategory(category.name)
      const a = response.data.books
      Array.isArray(a) ? setBooks(a) : setBooks(Object.values(a))
    })
  }

  function postCategory(e){
    e.preventDefault();
    const urls = url + `categories`
    const data = {
      name: document.getElementById('exampleInputCategory1').value
    }
    console.log(data)
    console.log(urls)
    console.log(header)
    axios.post(urls, data, {headers: header}).then((response) => {
      getCategories()
    }, (err) => {
      console.log(err)
    })
  }

  function home(){
    getBooks()
    getCategories()
    setByCategory(false)
    setPostBook(false)
    setEditBook(false)
  }

  function deleteCategory(id){
    const urls = url + `categories/${id}`
    axios.delete(urls, {headers: header}).then((response) => {
      getBooks()
      getCategories()
    })
  }

  function updateCategory(e){
    e.preventDefault();
    const urls = url + `categories/${editCategory}`
    const data = {
      name: document.getElementById('exampleInputCategory2').value
    }
    axios.patch(urls, data, {headers: header}).then((response) => {
      getBooks()
      getCategories()
      setEditCategory(false)
    })
  }

  function deleteBook(id){
    const urls = url + `books/${id}`
    axios.delete(urls, {headers: header}).then((response) => {
      getBooks()
      getCategories()
    })
  }

  function updateBook(e){
    e.preventDefault();
    const urls = url + `books/${editBook.id}`
    const data = {
      title: document.getElementById('exampleInputTitle2').value ? document.getElementById('exampleInputTitle2').value : document.getElementById('exampleInputTitle2').placeholder,
      description: document.getElementById('exampleInputdescription2').value ? document.getElementById('exampleInputdescription2').value : document.getElementById('exampleInputdescription2').placeholder,
      image_url: document.getElementById('exampleInputImage2').value ? document.getElementById('exampleInputImage2').value : document.getElementById('exampleInputImage2').placeholder,
      release_year: document.getElementById('exampleInputYear2').value ? document.getElementById('exampleInputYear2').value : document.getElementById('exampleInputYear2').placeholder,
      price: document.getElementById('exampleInputPrice2').value ? document.getElementById('exampleInputPrice2').value: document.getElementById('exampleInputPrice2').placeholder,
      total_page: document.getElementById('exampleInputPage2').value ? document.getElementById('exampleInputPage2').value : document.getElementById('exampleInputPage2').placeholder,
      category_id: document.getElementById('cars').value
    }
    console.log(data)
    axios.patch(urls, data, {headers: header}).then((response) => {
      getBooks()
      getCategories()
      setEditBook(false)
    })
  }

  function createBook(e){
    e.preventDefault();
    const urls = url + `books`
    const data = {
      title: document.getElementById('exampleInputTitle1').value,
      description: document.getElementById('exampleInputdescription1').value,
      image_url: document.getElementById('exampleInputImage1').value,
      release_year: document.getElementById('exampleInputYear1').value,
      price: document.getElementById('exampleInputPrice1').value,
      total_page: document.getElementById('exampleInputPage1').value,
      category_id: document.getElementById('cars').value
    }
    axios.post(urls, data, {headers: header}).then((response) => {
      getBooks()
      getCategories()
      setPostBook(false)
    })
  }

  function logout(){
    const urls = url + 'logout'
    axios.post(urls, {}, {headers: header}).then((response) => {
      alert(response.data.message)
      setAuth(false)
    }, (err) => {
      console.log(error)
    })
  }

  // styling
  const logins = {top: '14vh',left: '10vw',zIndex: '2',position: 'fixed',width: '80vw', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px', borderRadius: '20px'}


  return (
    <div style={{backgroundColor: 'black'}}>
      { auth ? <button onClick={() => logout()} style={{borderColor: 'red',right: '10px', textAlign: 'center', bottom: '10px',zIndex: '2', height: '60px', width: '60px', position: 'fixed', backgroundColor: 'red', color: 'white', borderRadius: '50%'}}>logout</button> : ''}
      {postBook ? 
      (<div style={{backgroundColor: 'black', color: 'white', height: '100vh', width: '100vw', position: 'relative', top: '0', zIndex: '3'}}>
        <div className="card text-bg-light mx-auto">
          <button onClick={() => home()} style={{color: 'white'}}>cancel</button>
          <div className="card-header"><h5 style={{margin: 'auto'}}>Upload Book</h5>
          </div>
          <form onSubmit={createBook} >
          <div className="card-body" style={{paddingBottom: '0'}}>
            <div className="mb-3">
              <label htmlFor="exampleInputTitle1" className="form-label"><h6>Title</h6></label>
              <input type="username" className="form-control" id="exampleInputTitle1"/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputdescription1" className="form-label"><h6>Description</h6></label>
              <input type="username" className="form-control" id="exampleInputdescription1" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputImage1" className="form-label"><h6>Image url</h6></label>
              <input type="username" className="form-control" id="exampleInputImage1"/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputYear1" className="form-label"><h6>Release year</h6></label>
              <input type="username" className="form-control" id="exampleInputYear1"/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPrice1" className="form-label"><h6>Price</h6></label>
              <input type="username" className="form-control" id="exampleInputPrice1" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPage1" className="form-label"><h6>Total page</h6></label>
              <input type="username" className="form-control" id="exampleInputPage1"/>
            </div><h1>category:</h1>
            <select style={{marginBottom: '10px'}} name="cars" id="cars">

            { categories ? categories.map((category, index) => (
                    <option key={index} value={category.id}>{category.name}</option>

            )) : ''}
              </select>

            <button type="submit" className="w-100 btn" style={{borderRadius: '20px', borderColor: 'skyblue'}}><h5 style={{margin: 'auto'}}>Post</h5></button>
          </div>
          </form>
        </div>  
      </div>) : ''}

      {editBook ? 
      (<div style={{backgroundColor: 'black', color: 'white', height: '100vh', width: '100vw', position: 'fixed', top: '0', zIndex: '3', overflow: 'visible'}}>
        <div className="card text-bg-light mx-auto">
          <button onClick={() => home()} style={{color: 'white'}}>cancel</button>
          <div className="card-header"><h1 style={{margin: 'auto'}}>Update Book</h1>
          </div>
          <form onSubmit={updateBook} >
          <div className="card-body row" style={{paddingBottom: '0'}}>
            <div className="col-6 col-sm-3">
              <label htmlFor="exampleInputTitle1" className="form-label"><h6>Title</h6></label>
              <input type="username" className="form-control" id="exampleInputTitle2" placeholder={editBook.title}/>
            </div>
            <div className="mb-3 col-6 col-sm-9">
              <label htmlFor="exampleInputdescription1" className="form-label"><h6>Description</h6></label>
              <input type="username" className="form-control" id="exampleInputdescription2" aria-describedby="emailHelp" placeholder={editBook.description}/>
            </div>
            <div className="col-6 col-sm-3">
              <label htmlFor="exampleInputYear1" className="form-label"><h6>Release year</h6></label>
              <input type="username" className="form-control" id="exampleInputYear2" placeholder={editBook.release_year}/>
            </div>
            <div className="col-6 col-sm-9">
              <label htmlFor="exampleInputImage1" className="form-label"><h6>Image url</h6></label>
              <input type="username" className="form-control" id="exampleInputImage2" placeholder={editBook.image_url}/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPrice1" className="form-label"><h6>Price</h6></label>
              <input type="username" className="form-control" id="exampleInputPrice2" aria-describedby="emailHelp" placeholder={editBook.price}/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPage1" className="form-label"><h6>Total page</h6></label>
              <input type="username" className="form-control" id="exampleInputPage2" placeholder={editBook.total_page}/>
            </div><h1>category:</h1>
            <select style={{marginBottom: '10px'}} name="cars" id="cars">

            { categories ? categories.map((category, index) => (
                    <option key={index} value={category.id}>{category.name}</option>

            )) : ''}
              </select>

            <button type="submit" className="w-100 btn" style={{borderRadius: '20px', borderColor: 'skyblue'}}><h5 style={{margin: 'auto'}}>Update</h5></button>
          </div>
          </form>
        </div>  
      </div>) : ''}

      <div className="card text-bg-light mx-auto" style={auth ? {display: 'none'} : logins}>
        <div className="card-header"><h3 style={{margin: 'auto'}}>{ login ? "Login" : "Signup" }</h3>
        </div>
        <div className="card-body" style={{paddingBottom: '0'}}>
          <div className="mb-3">
            <label htmlFor="exampleInputUsername1" className="form-label"><h6>Username</h6></label>
            <input type="username" className="form-control" id="exampleInputUsername1"/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label"><h6>Email address</h6></label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We will never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label"><h6>Password</h6></label>
            <input type="password" className="form-control" id="exampleInputPassword1"/>
          </div>
          <button onClick={() => authorize()} type="submit" className="w-100 btn" style={{borderRadius: '20px', borderColor: 'skyblue'}}><h5 style={{margin: 'auto'}}>{ login ? "Log in" : "Sign up" }</h5></button>
          <div className="mb-3">
            <div style={{color: 'red'}}>{error ? 'The data entered is incorrect' : ''}
            </div>
            {/* <div id="emailHelp" className="form-text" style={{ 'display': login ? 'none': ''}}>{ login ? "Does not have account? create right now" : "Already have account? Login now"}</div> */}
            { !login ? '' :
              <button onClick={() => {setLogin(false); setError(false)}} className="w-100 btn mt-3" style={{borderRadius: '20px', borderColor: 'skyblue'}}><h5 style={{margin: 'auto'}}>Sign up</h5></button>
            }
            <div style={{height: '18vh'}}></div>
          </div>
        </div>
      </div>
      
      <form style={{position: 'fixed', top: '25px', right: '25px', backgroundColor: 'white'}}>
      <input type="text" placeholder="Search..." style={{width: '25vw', borderColor: 'black'}}/>
        <button style={{width: '29px'}} type="submit">&#x1F50E;&#xFE0E;</button>
      </form>

      <div style={{height: '80px', backgroundColor:'red', padding: '17px', fontSize: '30px', fontWeight: '900'}}>
        <p>Book Store</p>
      </div>
      {byCategory ? 
      <div style={{width: '100vw',backgroundColor: 'black', padding: '10%', paddingTop: '30px'}}>
        <button onClick={() => home()} style={{color: 'white'}}>back</button>
        <h1 style={{color: 'white'}}>{byCategory}</h1>
        <div className="row">
          { !books ? <h1 style={{color: 'white'}}>Tidak ada buku</h1> : books.map((book, index) => (
          <div key={index} className="col-6 col-sm-3" style={{padding: '5px', marginTop: '0'}}>
            <div className="card btn btn-light" style={{borderRadius: '0.5em', padding: '0', borderColor: 'white'}}>
              <img src="https://dummyimage.com/600x640/b2b3bd/6e6c82.png" className="card-img-top" alt="..." style={{borderTopLeftRadius: '0.5em', borderTopRightRadius: '0.5em'}}/>
              <div className="card-body" style={{padding: '10%', paddingBottom: '0', textAlign: 'left'}}>
                <h6 className="card-title">{ book.title }</h6>
                <h6 className="card-text">Rp.{ book.price }</h6>
                <h6>{book.description}</h6>
                <h6>tahun: {book.release_year}</h6>
                <h6>{book.total_page} halaman ({book.thickness})</h6>
                <button style={{width: '50%',backgroundColor: 'red', borderColor: 'red', color: 'white'}}>&#128465;</button>
                <button style={{width: '50%',backgroundColor: 'blue', borderColor: 'blue', color: 'white'}}>&#9998;</button>
              </div>
            </div>
          </div>))}
        </div>
      </div>
      :
      <div style={{width: '100vw',backgroundColor: 'black', padding: '10%', paddingTop: '30px'}}>
        <div className="row">
        <h1 style={{color: 'white'}}>Categories</h1>  
        { !addCategory ?
        <button onClick={() => setAddCategory(true)} style={{marginTop: '2px',width: '25vw', position: 'absolute', right: '9vw', backgroundColor: 'green', borderColor: 'green'}}> tambah</button>
        :
        <button onClick={() => setAddCategory(false)} style={{marginTop: '2px',width: '25vw', position: 'absolute', right: '9vw', backgroundColor: 'red', borderColor: 'red'}}> X</button>
        }
        { addCategory ? <form onSubmit={postCategory} style={{backgroundColor: 'black', marginTop: '5%'}}>
        <div className="mb-3">
            <label htmlFor="exampleInputCategory1" className="form-label"><h6 style={{color: 'white'}}>Name</h6></label>
            <input type="category" className="form-control" id="exampleInputCategory1"/>
          </div>
        <button type="submit" className="w-100 btn" style={{borderRadius: '20px', borderColor: 'skyblue', color:'white'}}><h1>+</h1></button>
      </form> : '' }
      { editCategory ? <form onSubmit={updateCategory} style={{backgroundColor: 'black', marginTop: '5%'}}>
        <div className="mb-3">
            <label htmlFor="exampleInputCategory1" className="form-label"><h6 style={{color: 'white'}}>Name</h6></label>
            <input type="category" className="form-control" id="exampleInputCategory2"/>
          </div>
        <button type="submit" className="w-100 btn" style={{borderRadius: '20px', borderColor: 'skyblue', color:'white'}}><h1>update</h1></button>
      </form> : '' }

        <hr style={{color: 'white'}}></hr>
          { categories ? categories.map((category, index) => (
            <div key={index} className="col-6 col-sm-3"> 
              <button onClick={() => getBooksByCategory(category)} style={{display: 'inline', width: '70%',borderColor: '#373737',backgroundColor: '#373737', color: 'white', marginBottom: '15px', textAlign: 'center'}}>{category.name}</button>
              <button onClick={() => deleteCategory(category.id)} style={{width: '19px',display: 'inline',backgroundColor: 'red', borderColor: 'red', color: 'white'}}>&#128465;</button>
              <button onClick={() => setEditCategory(category.id)} style={{display: 'inline',backgroundColor: 'blue', borderColor: 'blue', color: 'white'}}>&#9998;</button>
            </div>
          )) : ''}
        </div>

        <h1 style={{color: 'white', display: 'inline'}}>Books</h1>  
        <button onClick={() => setPostBook(true)} style={{marginTop: '2px',width: '25vw',display: 'inline', float: 'right', backgroundColor: 'green', borderColor: 'green'}}>tambah</button>
        <hr style={{color: 'white'}}></hr>

        <div className="row">
          { !books ? '' : books.map((book, index) => (
          <div key={index} className="col-6 col-sm-3" style={{padding: '5px', marginTop: '0'}}>
            <div className="card btn btn-light" style={{borderRadius: '0.5em', padding: '0', borderColor: 'white'}}>
              <img src="https://dummyimage.com/600x640/b2b3bd/6e6c82.png" className="card-img-top" alt="..." style={{borderTopLeftRadius: '0.5em', borderTopRightRadius: '0.5em'}}/>
              <div className="card-body" style={{padding: '10%', paddingBottom: '0', textAlign: 'left'}}>
                <h6 className="card-title">{ book.title }</h6>
                <h6 className="card-text">Rp.{ book.price }</h6>
                <h6>{book.description}</h6>
                <h6>tahun: {book.release_year}</h6>
                <h6>{book.total_page} halaman ({book.thickness})</h6>
                <button onClick={() => deleteBook(book.id)} style={{width: '50%',backgroundColor: 'red', borderColor: 'red', color: 'white'}}>&#128465;</button>
                <button onClick={() => setEditBook(book)} style={{width: '50%',backgroundColor: 'blue', borderColor: 'blue', color: 'white'}}>&#9998;</button>
              </div>
            </div>
          </div>))}
        </div>
      </div>}
    </div>
  );
}
