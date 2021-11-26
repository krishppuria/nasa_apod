util={}
try {
    util.renameProp= async(obj,oldKey,newKey)=>{
        if(obj[oldKey]){
            obj[newKey]=obj[oldKey]
            delete obj[oldKey]
        }
    }    
} catch (error) {
    throw error;
}

module.exports=util;