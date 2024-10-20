import Left from './components/left.jsx'
import Profile from './components/profile.jsx'


const AuthProfile = ({component}) => {

    return (
        <>
            <Left/>

            {component ? component : <Profile/>}
            
        </>
    )
} 


export default AuthProfile