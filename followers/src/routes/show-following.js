import express from 'express';
import { requireAuth } from '@rikwetter/common';
import { UserFollowers } from '../models/user-following.js';

const router = express.Router();

router.get('/api/followers', requireAuth, async (req, res) => {

    const currentUser = req.currentUser.id;
    const currentUserDoc = await UserFollowers.findById(currentUser);

    const usersFollowed = currentUserDoc.following;

    res.status(200).send(usersFollowed);
})

router.get('/api/followers/myfollowers', requireAuth, async (req, res) => {

    const currentUser = req.currentUser.id;
    const currentUserDoc = await UserFollowers.findById(currentUser);

    const followers = currentUserDoc.followers;

    res.status(200).send(followers);
})
router.get('/api/followers/explore', requireAuth, async (req, res) => {

    const currentUser = req.currentUser.id;
    const allUsers = await UserFollowers.find( { _id: {$ne: currentUser} } ) //UserFollowers.find({_id: {$ne: currentUser}},{ followers: {$nin: [currentUser]} })//.where('followers').nin([currentUser]); //, followers: {$nin: currentUser} 
                        //    UserFollowers.find( { followers: { $nin: [ currentUser ] } }, { _id: {$ne: currentUser} } ) 

    let explored = []

    for (let i =0; i < allUsers.length; i++){
        let followed = false
        for(let j = 0; j < allUsers[i].followers.length; j++){
            if(allUsers[i].followers[j].userId == currentUser){
                followed = true
            }
        }
        if(!followed){
            explored.push(allUsers[i].id)
        }
    }

    res.status(200).send(explored);
})

export { router as showFollowingRouter };