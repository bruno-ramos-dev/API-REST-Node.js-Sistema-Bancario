const validationRequisitionQuery = validationsSchema => async (req, res, next) => {
    try {
        await validationsSchema.validateAsync(req.query)
        next()
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
} 

module.exports = {
    validationRequisitionQuery
}