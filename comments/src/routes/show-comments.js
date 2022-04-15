import express from 'express'

const router = express.Router();

router.get('api/comments', async (req, res) => {
    res.send({});
})

export { router as showCommentsRouter };