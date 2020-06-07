import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../Contexts/AuthContextProvider'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ImageUpload from './ImageUpload'

const NavBar = ({auth}) =>{
    const { headers, logout } = useContext(AuthContext)
    const [ user, setUser ] = useState({name: "", img: null})
    const [ open, setOpen ] = useState(false)

    const updatePic = (value) => setUser({...user, img: value})

    const toggleOpen = () => setOpen(prev => !prev)

    useEffect(()=>{
        const load = async () => {
            if(email){
                const res = await axios.get("/user/me",{ headers })
                let { name, img } = res.data
                setUser({ name, img })    
            }
        }
        load()    
    }, [email])

    console.log("at nav")
    
    const dropDown = {
        top : "100%",
        zIndex : 100,
        right : "10px",
        width : "200px"
    }
    
    console.log(user.name)

    const MiniProfile = () => (
    <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" onClick={toggleOpen}> { user.name } </button>

        { open ? 
        <>
            <div className="card text-center position-absolute" style={dropDown}>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    { 
                    user.img ? 
                    <img className="border border-warning rounded" width="100%" src={`/upload/${user.img}`} /> :
                    <ImageUpload headers={headers} updatePic={updatePic} /> 
                    }
                </li>
                <li className="list-group-item">
                    <button onClick={toggleOpen} className="btn btn-primary btn-block">
                        <Link to="/profile"> My Page </Link>
                    </button> 
                </li>
                <li className="list-group-item">
                    <button onClick={logout} className="btn btn-primary btn-block">
                        Log Out
                    </button>
                </li>
            </ul>
            </div>
        </>
        : null
        }
    </div>
    )

    return(
    <nav className="navbar text-light bg-dark">
        <Link className="navbar-brand text-light" to="/">
            Your App Name
        </Link>
        
        <div className="form-inline">
            { auth ? <MiniProfile /> : "" }
        </div>
    </nav>
)
}

export default NavBar