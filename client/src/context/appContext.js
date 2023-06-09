import React,{useState, useReducer, useContext} from 'react'
import { CLEAR_ALERT, DISPLAY_ALERT, REGISTER_USER_BEGIN,REGISTER_USER_SUCCESS,REGISTER_USER_ERROR } from './actions'
import reducer from './reducers'
import axios from "axios";

const initialState= {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    user: null,
    token: null,
    userLocation: "",
    jobLocation: "",
}


const AppContext = React.createContext()



const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const dispatchAlert = () => {
        dispatch({type: DISPLAY_ALERT})
        clearAlert()
    }
    
    const clearAlert = () => {
        setTimeout(() => {
          dispatch({type: CLEAR_ALERT})
        }, 3000)
    }
    
    
    const registerUser = async(currentUser) => {
        dispatch({type: REGISTER_USER_BEGIN})
    
      try {
        const response= await axios.post("/api/v1/auth/register", currentUser)
        console.log(response.data)
        const {user, token, location}=response.data
        dispatch({type: REGISTER_USER_SUCCESS,
        payload:{user,token,location}})
      }
    //   localstorage
      catch (error) {
         dispatch({type: REGISTER_USER_ERROR, payload: {msg : error.response.data.msg},
        })
      }
    
    clearAlert()
    
    
    
    
    }
    
    
    
    
    return (
     <AppContext.Provider value={{...state, dispatchAlert, registerUser}}>
        {children}
     </AppContext.Provider>
        )
      
}

const useAppContext = () => {
    return useContext(AppContext)
}





export {AppProvider, initialState, useAppContext}