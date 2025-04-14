import Favorite from './views/Favorite'
import HomePage from './views/HomePage'
import MovieDetail from './views/MovieDetail'
import {BrowserRouter, Routes, Route} from "react-router"
import Navbar from './components/navbar'
import PeopleDetail from './views/PeopleDetail'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/favorites' element={<Favorite/>}/>
          <Route path='/movie/:movie_id' element={<MovieDetail/>}/>
          <Route path='/people/:people_id' element={<PeopleDetail/>}/>

        </Routes>
      </BrowserRouter>
   
      
    </>
  )
}

export default App
