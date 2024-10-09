import axios from "axios"

const Get = async (url) => {

    const res = await axios.get(url)
    return res
}

export default Get