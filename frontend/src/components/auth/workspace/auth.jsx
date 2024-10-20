import Left from './components/left.jsx'
import Profile from './components/profile.jsx'


const AuthProfile = ({component , userMenuOpen, setUserMenuOpen }) => {

    return (
        <>
            <Left/>

            {component ? component : <Profile/>}
            
        </>
    )
} 


export default AuthProfile