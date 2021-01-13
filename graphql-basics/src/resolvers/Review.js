const Review = {
    parentProdOfRev(parent,args, { db }, info){
        return db.prodArray.find(prod => prod.prodID == parent.parentProdOfRev)
    },
    commentsChildOfRev(parent,args,{ db },info){
        return db.commentsArray.filter(comm => comm.parentRevOfComm == parent.id)
    },
    parentUserOfRev(parent,args,{ db },info){
        return db.usersArray.find(user => user.id == parent.parentUserOfRev)
    }
}

export {Review as default}