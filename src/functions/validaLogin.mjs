function validaLogin(req,res,next){
    if(req.session.user){
        next()
    }else{
        res.redirect("/pages/login/login.html")
    }
}

export default validaLogin