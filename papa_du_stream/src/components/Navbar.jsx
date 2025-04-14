
import { Link, NavLink} from 'react-router'

const Navbar = () => {
  return (
    <div>
      <nav className="bg-blue-950 px-16 py-7 flex flex-col md:flex-row items-center justify-around">
      <Link to="/">
        <h1 className="text-green-500 uppercase font-black text-2xl">
          favflicks
        </h1>
      </Link>
      
      <NavLink
        className={({ isActive }) =>
          `text-lg ${isActive ? "text-green-500" : "text-gray-300"}`
        }
        to="/favorites"
      >
        Favorites
      </NavLink>
    </nav>
    </div>
  )
}

export default Navbar
