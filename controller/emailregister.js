import axios from "axios"
const getGeocode = async (address) => {
    const {data} = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${address}&format=json&apiKey=${process.env.API_KEY}`)
    if(data.results.length ===0 ){
        return false
    }
    return [data.results[0].lon, data.results[1].lat]
}

const getDistance = async (source, target) => {
    const src=await getGeocode(source)
    const targt=await getGeocode(target)
    if(src && targt){
        const { data } = await axios.post(`https://api.geoapify.com/v1/routematrix?apiKey=${process.env.API_KEY}`, 
        { "mode": "drive", "sources": [{ "location": src }], "targets": [{ "location": targt }] })
        console.log(data.sources_to_targets[0][0].distance)
        return data.sources_to_targets[0][0].distance
    }
    else{
        return false
    }
    
}
const priceCalc=(distance)=>{
// we get some data database then calc the price like perkm,baseamount
// because of not exact formula given I am assuming
const perkm=2.5
const baseamount=10
return( distance*perkm +baseamount)
}


export const emailcheck=async(req,res)=>{
    const {source,target}=req.body
    try {
        const specialcity=["london","paris"]
        const flaggedcity=["denmark"]

        const distance=await getDistance(source,target)
        const price=priceCalc(distance)
        console.log(distance)
        if(!distance){
            res.status(404).send({msg:"wrong source/destination"})
        }
        else if(distance/1000 >1000 || !distance){
            res.status(403).send({msg:"Too far to offer ride"})
        }
        else if (specialcity.includes(source)){
            res.status(200).send({require:false})
        }
        else{
            if(distance/1000 > 30 || price<50 || source.includes() ){
                res.status(200).send({require:true})
            }
        }
    } catch (error) {
        res.sendStatus(500).send("something went wrong...")
    }
}