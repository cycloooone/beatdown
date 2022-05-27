const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('../views/login.ejs')
    
})


module.exports = router
