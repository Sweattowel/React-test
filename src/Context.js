import { createContext, useState, useContext, useEffect } from "react";

const MyContext = createContext();

export const useMyContext = () => {
    return useContext(MyContext);
};

export const MyContextProvider = ({ children }) => {
    const [ myFormat, setMyFormat ] = useState('line');
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ selectedUser, setSelectedUser ] = useState(null)
    const [ pageCount, setPageCount ] = useState(10);
    useEffect(() => {
        if(currentPage <= 0){
                    setCurrentPage(1)
                }
        
    },[currentPage]);
        

    return (
        <MyContext.Provider value={{ myFormat, setMyFormat, currentPage, setCurrentPage,  selectedUser, setSelectedUser, pageCount, setPageCount }}>
            { children }
        </MyContext.Provider>
    );
};

export default MyContextProvider