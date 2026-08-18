import{Navigate} from  "react-router-dom";

import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({children}) =>{
    const {isAuthenticated, loading} = useAuth();

    if(loading){
        return <p>Loading ...</p>
    }
    if(isAuthenticated){
        return <Navigate to ="/login" replace/>;
    }
     return children
};

export default ProtectedRoute;