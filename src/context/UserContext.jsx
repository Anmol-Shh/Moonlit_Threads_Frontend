import React, { createContext } from 'react'

export const dataContext = createContext()

const UserContext = ({children}) => {
    
    const userData={
        username:"Anmol",
        age:20,
        city:"Ramnagar"
    }

  return (
    <div>
        <dataContext.Provider value={userData}>
        {children}
        </dataContext.Provider>
    </div>
  )
}

export default UserContext