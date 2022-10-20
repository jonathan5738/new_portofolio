const formatAdminOutput = (admin, token) => {
    const data = {}
    for(let key of Object.keys(admin)){
        if(key === 'password') continue 
        data[key] = admin[key]
    }
    data.token = token 
    return data
}
module.exports = {
    formatAdminOutput
}