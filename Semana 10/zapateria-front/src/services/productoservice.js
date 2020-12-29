const ENDPOINT = "http://localhost:5000"

export const devolverProductos = async()=>{
    try {
        let res= await fetch(ENDPOINT+'/producto');
        let data = await res.json()
        return data;
    } catch (error) {
        console.error(error)
        return error;
    }
}