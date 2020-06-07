import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Contexts/AuthContextProvider'
import ImageUpload from './ImageUpload'
import NewPass from './NewPass'

function Profile() {
    const { name, email, img, headers, updatePic, logout, deleteAcc } = useContext(AuthContext)
    const [ pass, setPass ] = useState(false)
    
    const updatePass = () => setPass(prev => !prev)

    return (
        <div className="card text-center w-75 ml-auto mr-auto">
            <h4 className="card-header">
                Profile Page
            </h4>
            { img ? 
                <div className="card-text w-50 mt-1 mb-1 ml-auto mr-auto">
                    <img 
                        className="card-img-top"
                        width="100%"
                        src={`/upload/${img}`} 
                        alt={name} 
                    />
                </div>
                 :
                <div className="card-text w-50 mt-1 ml-auto mr-auto">
                    <ImageUpload headers={headers} updatePic={updatePic} />
                </div> 
            }
            <div className="card-body">
                <h2 className="card-title mt-1"> <strong> { name } </strong> </h2>
                <h3 className="card-text mt-1"> <strong> { email } </strong> </h3>
                
                <div className="card-text w-50 ml-auto mr-auto mt-2">
                    <p className="mb-1">Change your password</p>
                    <>
                        { pass ? <NewPass headers={headers} updatePass={updatePass} /> : 
                        <button onClick={()=> setPass(true)} className="btn btn-outline-primary btn-block">
                            Change
                        </button>
                        }
                    </>
                </div>
                
                <div className="card-text mt-2">
                    <h6> <strong> Delete your account : </strong> </h6>  
                    <button onClick={deleteAcc} className="btn btn-outline-danger w-50 ml-auto mr-auto">
                            Delete 
                    </button>
                </div>

                <p className="card-text w-50 mt-2 mb-2 ml-auto mr-auto">
                    <button onClick={logout} className="btn btn-outline-primary btn-block">
                            Log Out
                    </button>
                </p>
            </div>
        </div>
    )
}

export default Profile