const Comment = {
    parentRevOfComm(parent,args,{ db },info){
        return db.reviewsArray.find(review => review.id == parent.parentRevOfComm)
    },
    parentProdOfComm(parent,args,{ db },info){ 
        return db.prodArray.find(prod => prod.prodID == parent.parentProdOfComm)
    },
    parentUserOfComm(parent,args,{ db },info){
        return db.usersArray.find(user => user.id == parent.parentUserOfComm)
    }
}

export {Comment as default}