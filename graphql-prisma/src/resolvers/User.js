const User = {
    posts(parent,args,{ db },info){
        return db.reviewsArray.filter(rev => rev.parentUserOfRev == parent.id )
    },
    comments(parent,args,{ db },info){
        return db.commentsArray.filter(comm => comm.parentUserOfComm == parent.id)
    },
    favouriteProd(parent,args,{ db },info){
        return db.prodArray.find(prod => prod.prodID == parent.favouriteProd)
    }
}

export {User as default}