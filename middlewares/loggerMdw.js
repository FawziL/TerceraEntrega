const logger = require("../utils/logger");

const handleAll = (req, res, next) => {
    logger.info(`${req.method}: ${req.path} - `)
    next()
}
module.exports =  handleAll 
