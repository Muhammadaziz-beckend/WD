import axios from "axios"

const Get = async (url) => {

    try {

        const res = await axios.get(url)
        return res
    } catch (e){
        console.log(e);
        
    }
}

export default Get