export default (emails) =>{
    //split and trim the string on the commas
    const emailsArray = emails
    .split(',')
    .map(email => email.trim())
}