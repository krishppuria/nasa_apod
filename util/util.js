util={}

util.renameProp= async(obj,oldKey,newKey)=>{
    if(obj[oldKey]){
        obj[newKey]=obj[oldKey]
        delete obj[oldKey]
    }
}

module.exports=util;