import { createContext, useState } from "react";

export const StatesContext = createContext()
export function StatesProvider(props) {
    const [userid, setUserid] = useState(0)
    const [logged ,setLogged] = useState(false)
    const [started, setStarted] = useState(false)
    const [isloading, setIsloading] = useState(true)
    const [eligble, setEligble] = useState(false)
    const [posts, setPosts] = useState([]);
    const [job, setJob] = useState(0)
    let [currentPage, setCurrentPage] = useState(0);
    const [postsPerPage, setpostsPerPage] = useState(1);
    const[score, setScore] = useState({"score": 0, "total":0})
    return (
       <StatesContext.Provider value={{logged, setLogged,
       isloading, setIsloading, eligble, setEligble,
       posts, setPosts,
       job, setJob, currentPage, setCurrentPage, postsPerPage, setpostsPerPage,
       started, setStarted, userid, setUserid
       }}>
        {props.children}
       </StatesContext.Provider>
    )
}

