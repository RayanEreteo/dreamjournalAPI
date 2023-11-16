module.exports = function token_verify(req, res, next){
    const token = req.headers.authorization

    if (!token) {
        return res.send("Aucun token")
    }

    next()
}