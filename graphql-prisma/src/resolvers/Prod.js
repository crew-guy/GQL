const Prod = {
    prodReviews(parent, args, { db },info){
        return db.reviewsArray.filter(rev=> rev.parentProdOfRev == parent.prodID)
    },
    prodComments(parent,args,{ db },info){
        return db.commentsArray.filter(comm => comm.parentProdOfComm == parent.prodID)
    },
    frequentUsers(parent,args,{ db },info){
        return db.usersArray.filter(user => user.favouriteProd == parent.prodID)
    }
}

export {Prod as default}