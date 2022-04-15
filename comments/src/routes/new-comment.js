import express from 'express'

const router = express.Router();

router.post('api/comments', async (req, res) => {
    res.send({});
})

export { router as createCommentsRouter };