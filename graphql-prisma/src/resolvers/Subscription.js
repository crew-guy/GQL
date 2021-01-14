const Subscription = {
    count:{
        subscribe(parent, args, {pubsub}, info){
            let number = 0;

            setInterval(()=>{
                number++;
                pubsub.publish("mycountingchannel", {
                    count : number
                })
            },300 )

            return pubsub.asyncIterator("mycountingchannel")
        }
    },
    comment:{
        subscribe(parent, {parentRevOfComm}, {db, pubsub}, info){
            const review = db.reviewsArray.find(rev => rev.id == parentRevOfComm)

            if(!review){
                throw new Error('Review does not exist')
            }

            return pubsub.asyncIterator("comment")
        }
    },
    review:{
        subscribe(parent,args, {pubsub}, info){
            return pubsub.asyncIterator("review")
        }
    }
}

export {Subscription as default}