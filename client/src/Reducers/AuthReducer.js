export default (state, action) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                loading : true 
            }

        case "LOGIN":
            return {
                ...state,
                name : action.payload.name,
                email : action.payload.email,
                img : action.payload.img,
                auth : action.payload.auth,
                token : action.payload.token,            
                loading : false 
            }

        case "IMG":        
            return {
                ...state,
                img : action.payload.imgName
            }
    
        case "LOGOUT":
            return {
                ...state,
                name : "",
                email : "",
                img : "",
                auth : false,
                token : "",            
                loading : false 
            }
               
        case "ERROR":
            return {
                ...state,
                loading : false,
                error : "Something went wrong..." 
            }

        default: return state
    }
}