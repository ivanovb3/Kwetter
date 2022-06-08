import { Listener } from '@rikwetter/common';
import { UserFollowers } from '../models/user-following.js'

export class UserDeletedListener extends Listener {
    async onMessage(data, msg) {
        const { id } = data

        await UserFollowers.updateMany({}, {
            $pull: {
                followers: {userId: id},
                following: {userId: id}
            }
        })

        //const user = await UserFollowers.find({_id: id})

        await UserFollowers.deleteOne({ _id: id })

        console.log(`User of id: ${id} should be deleted`);

        msg.ack()
    }
}
