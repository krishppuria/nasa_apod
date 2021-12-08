let util={}
try {
    util.renameProp= async(obj,oldKey,newKey)=>{
        if(obj[oldKey]){ //check if oldkey exists
            obj[newKey]=obj[oldKey] //creating and assining data to new property
            delete obj[oldKey] //deleting old property
        }
    }    
} catch (error) {
    throw error;
}

module.exports=util;