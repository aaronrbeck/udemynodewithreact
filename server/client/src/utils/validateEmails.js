const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        
export default (emails) =>{
    //split and trim the string on the commas
    const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    //filter out invalid emails:
    //used emailregex.com to help identify invalid emaails
    .filter(email => re.test(email) === false)

    //if anything ended up in the invalid array, return them
    if(invalidEmails.length){
        //write return as a template string:
        return `These emails are invalid: ${invalidEmails}`
    }
    return
    
}