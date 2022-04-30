import express from 'express';
import { requireAuth, validateRequest } from '@rikwetter/common';
import { body } from 'express-validator';
import { UserFollowers } from '../models/user-following.js'

const router = express.Router();

router.post('/api/followers', requireAuth, [
    body('userId')
        .not()
        .isEmpty()
        .withMessage('User id must be provided')
], validateRequest, async (req, res) => {
    //Find content to post a comment on
    const { userId } = req.body;
    const currentUser = req.currentUser.id;

    const user = await UserFollowers.findById(userId);
    const currentUserDoc = await UserFollowers.findById(currentUser);
    if(!user) {
        return res.sendStatus(404).send('Not found user');
    }
    let array = user.followers
    for (var i =0; i< array.length; i++){
        if(array[i].userId == currentUser){
            //Remove follower to the user that is being unfollowed now          
            user.followers.pull({_id: user.followers.find(x => x.userId == currentUser)._id});   //user.followers.pull({_id: array[i]._id});
            await user.save();            
            //Remove userfrom the following list of the current user   
            currentUserDoc.following.pull({_id: currentUserDoc.following.find(x => x.userId == user.id)._id});
            await currentUserDoc.save();

            return res.status(201).send(currentUserDoc);
        }
    }
    //Add new follower to the user that is being followed now
    user.followers.push({userId: currentUser});
    await user.save();
    //Add new user to the following list of the current user    
    currentUserDoc.following.push({userId: userId});
    await currentUserDoc.save();

    res.status(201).send(currentUserDoc);
})

export { router as followerHandlerRouter };