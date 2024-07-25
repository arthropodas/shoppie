const validateLoginForm=(formData)=>{

    let formErrors={errorCode:'E100',msg:{email:[],password:[]} }

    const {email,password}=formData;
    

    if(!email){
      
        formErrors.msg.email.push('Email is required')
    }
    if(!password){
       
        formErrors.msg.password.push('Password is required')
    }
    if (formErrors.msg.email.length > 0 || formErrors.msg.password.length > 0) {
        return formErrors
    }

  


}

module.exports={validateLoginForm}