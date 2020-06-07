import React, { useEffect, useRef, useState } from 'react'
import { usePvalid, useCvalid } from '../../Customs/useValidation'
import useInput from '../../Customs/useInput'
import axios from 'axios'

function NewPass({headers, updatePass}) {
    const [ oldPass, oldPonChange, opmsg, operr ] = useInput('', usePvalid)
    const [ newPass, newPonChange, npmsg, nperr ] = useInput('', usePvalid)
    const [ conPass, conPonChange, cpmsg, cperr ] = useInput('', useCvalid, newPass)
    const [ fail, setFail ] = useState(false)

    let oldPassRef = useRef('')
    let newPassRef = useRef('')
    let conPassRef = useRef('')
    let SubRef = useRef('')

    useEffect(()=>{
        oldPassRef.current.focus() 
    }, [])

    function oldPassKeyDown(e) {
        if(e.key === "Enter") newPassRef.current.focus()
    }

    function newPassKeyDown(e) {
        if(e.key === "Enter") conPassRef.current.focus()
    }

    function conPassKeyDown(e) {
        if(e.key === "Enter") SubRef.current.focus()
    }
    console.log(headers)

    const onSubmit = async (event) =>{
        event.preventDefault();
        try {
            if(operr === false && nperr === false && cperr === false){
                let res = await axios.put("/user", { oldPass, newPass }, {headers})
                console.log(res.data)
                updatePass()
            }
        } catch (error) {
            setFail(true)
            console.log(error)
        }
    }

return (
    <>
    <div className="form-group">
    <label htmlFor="password"> Old Password </label>
        <input
            className="form-control"
            ref={oldPassRef}
            onKeyDown={oldPassKeyDown} 
            name="password"
            type="password"
            value={oldPass}
            onChange={oldPonChange}
        />
    </div>
    { 
    operr && <div className="alert alert-danger" role="alert"> {opmsg} </div>                        
    }

    <div className="form-group">
        <label htmlFor="password"> New Password </label>
        <input
            className="form-control"
            ref={newPassRef}
            onKeyDown={newPassKeyDown} 
            name="password"
            type="password"
            value={newPass}
            onChange={newPonChange}
        />
    </div>
    { 
    nperr && <div className="alert alert-danger" role="alert"> {npmsg} </div>                        
    }

    <div className="form-group">
        <label htmlFor="password"> Conform Password </label>
        <input
            className="form-control"
            ref={conPassRef}
            onKeyDown={conPassKeyDown} 
            name="password"
            type="password"
            value={conPass}
            onChange={conPonChange}
        />
    </div>
    { 
    cperr && <div className="alert alert-danger" role="alert"> {cpmsg} </div>                        
    }

    <button
        className="btn btn-outline-primary" 
        ref={SubRef} 
        onClick={onSubmit}
    >Submit</button>

    {
    fail && <div className="alert alert-danger mt-1 mb-1" role="alert"> Failed to Update. Try again.</div> 
    }
    </>
)
}

export default NewPass