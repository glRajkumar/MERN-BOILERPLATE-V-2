import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Contexts/AuthContextProvider'
import { Link } from 'react-router-dom'
import ProfileImg from '../../Img/Profile.png'

const NavBar = ({auth}) =>{
    const { name, email, img, logout } = useContext(AuthContext)
    const [ open, setOpen ] = useState(false)

    const toggleOpen = () => setOpen(prev => !prev)

    const LogOut = () => {
        logout()
        toggleOpen()
    }

    const dropDown = {
        top : "100%",
        zIndex : 100,
        right : "10px",
        width : "200px"
    }
    
    const MiniProfile = () => (
        <div className="card text-center position-absolute" style={dropDown}>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    { 
                    img ? 
                    <img className="border border-warning rounded" width="100%" src={`/upload/${img}`} /> :
                    <img className="border border-warning rounded" width="100%" src={ProfileImg} /> 
                    }
                </li>
                <li className="list-group-item">
                    <strong className="text-dark"> {email} </strong>
                </li>
                <li className="list-group-item">
                    <Link to="/profile">  
                        <button onClick={toggleOpen} className="btn btn-outline-primary btn-block">
                            My Page
                        </button> 
                    </Link>
                </li>
                <li className="list-group-item">
                    <button onClick={LogOut} className="btn btn-primary btn-block">
                        Log Out
                    </button>
                </li>
            </ul>
        </div>
    )

    return(
    <>    
    <nav className="navbar text-light bg-dark">
        <Link className="navbar-brand text-light" to="/">
            Your App Name
        </Link>
    
        <div className="form-inline">
            { 
            auth ? 
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" onClick={toggleOpen}> { name } </button>
                </div> 
            : null 
            }
        </div>

        { open ? <MiniProfile /> : null }
    </nav>
    </>
)
}

export default NavBar