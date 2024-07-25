function vendorValidation(data){
    console.log("input",data)
 
    if(!data.name){
        console.log("no data ")
    }
    if (!data.name || !data.email || !data.address || !data.password) {
        return {errorCode :2001, message:'All fields are required'};
    }

}

module.exports = {vendorValidation}