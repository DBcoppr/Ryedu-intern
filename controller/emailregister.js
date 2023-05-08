import axios from "axios"
const getGeocode = async (address) => {
    const {data} = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${address}&format=json&apiKey=${process.env.API_KEY}`)
    return [data.results[0].lon, data.results[1].lat]
}

const getDistance = async (source, target) => {
    const src=await getGeocode(source)
    const targt=await getGeocode(target)
    const { data } = await axios.post(`https://api.geoapify.com/v1/routematrix?apiKey=${process.env.API_KEY}`, 
    { "mode": "drive", "sources": [{ "location": src }], "targets": [{ "location": targt }] })
    console.log(data.sources_to_targets[0][0].distance)
    return data.sources_to_targets[0][0].distance
}
export const emailcheck=async(req,res)=>{
    const {source,target}=req.body
    try {
        const data=await getDistance(source,target)
        const str=data.toString()
        res.sendStatus(200).send({val:str})
    } catch (error) {
        res.sendStatus(500).send("something went wrong...")
    }
}