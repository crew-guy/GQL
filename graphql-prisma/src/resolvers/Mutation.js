import { v4 as uuidv4 } from 'uuid';

const Mutation = {
    createUser(parent,args,{ db },info){
        const isEmailTaken = db.usersArray.find(user => user.email == args.data.email)
   
        if(isEmailTaken){
            throw new Error('Email le liya koi pehle se')
        }

        const user = {
            id:uuidv4(),
            ...args.data 
        }
        
        db.usersArray.push(user)
        return user
    },
    createReview(parent,args,{ db,pubsub },info){
        const doesUserExist = db.usersArray.find(user => user.id == args.data.parentUserOfRev)

        const doesProdExist = db.prodArray.find(prod => prod.prodID == args.data.parentProdOfRev)

        if(!doesProdExist){
            throw new Error('Gaand se nikalu kya yeh product...heh ?')
        }

        if(!doesUserExist){
            throw new Error('Yeh user kaun hai bhai ?')
        }
    
        const review = {
            id:uuidv4(),
            commentsChildOfRev:[],
            ...args.data
        }

        db.reviewsArray.push(review)
        pubsub.publish("review",{ 
            review:{
                mutation:'CREATED',
                data:review
            }
        })

        return review
    },
    createComment(parent,args,{ db,pubsub },info){
        const doesUserExist = db.usersArray.find(user => user.id == args.data.parentUserOfComm)

        const doesProdExist = db.prodArray.find(prod => prod.prodID == args.data.parentProdOfComm)

        const doesReviewExist = db.reviewsArray.find(review => review.id == args.data.parentRevOfComm)
        
        if(!doesProdExist){
            throw new Error('Abbe yaar......ye konse product ki baat ho reli ?')
        }

        if(!doesUserExist){
            throw new Error('Yeh user kaun hai bhai ?')
        }
    
        if(!doesReviewExist){
            throw new Error('Aise naam ka koi review nahi meri jaan')
        }

        const comment = {
            commId:uuidv4(),
            ...args.data
        }

        db.commentsArray.push(comment)
        pubsub.publish("comment", {
            comment:{
                mutation:'CREATED',
                data:comment
        }})

        return comment
    },
    deleteUser(parent,args,{ db },info){
        const userIndex = db.usersArray.findIndex(user => user.id == args.id)
        
        if(userIndex === -1){
            throw new Error('Yeh waala user toh mereko pata hi nahi yaar')
        }
        const deletedUsers = db.usersArray.splice(userIndex,1)

        db.reviewsArray = db.reviewsArray.filter(review => {
            const match = review.parentUserOfRev == args.id

            if(match){
                db.commentsArray = db.commentsArray.filter(comm => comm.parentRevOfComm !== review.id)
            }
            
            // console.log(match);
            return !match
        })
        db.commentsArray = db.commentsArray.filter(comm => comm.parentUserOfComm !== args.id )

        return deletedUsers[0]
    },
    deleteReview(parent,args, { db,pubsub }, info){
        const revIndex = db.reviewsArray.findIndex(review => review.id == args.id)

        if(revIndex === -1){
            throw new Error('Kuch bhi hava hi naa lag rahi ke kis review ki baat ho rahi hai')
        }

        // As splice method will return an array even if we just splice 1 single elem

        const [deletedReview] = db.reviewsArray.splice(revIndex, 1)

        db.commentsArray = db.commentsArray.filter(comment => comment.parentRevOfComm !== args.id)

        pubsub.publish("review",{
            review:{
                mutation:'DELETED',
                data:deletedReview
            }
        })

        return deletedReview
    },
    deleteComment(parent,args,{ db,pubsub },info){
        const commentIndex = db.commentsArray.findIndex(comment => comment.commId == args.id)

        if(commentIndex === -1){
            throw new Error('Aisa sab commenting humare waha nahi karte')
        }

        const [deletedComment] = db.commentsArray.splice(commentIndex,1)

        pubsub.publish("comment",{
            comment:{
                mutation:'DELETED',
                data:deletedComment
            }
        })


        return deletedComment
    },
    deleteProduct(parent,args,{ db },info){
        const productIndex = db.prodArray.findIndex(prod => prod.prodID == args.id)

        if(!productIndex){
            throw new Error('Product does not exist')
        }

        const [deletedProduct] = db.prodArray.splice(productIndex,1)

        usersArray = usersArray.filter(user => user.favouriteProd !== args.id)

        commentsArray = commentsArray.filter(comm => comm.parentProdOfComm !== args.id)

        reviewsArray = reviewsArray.filter(rev => rev.parentProdOfRev !== args.id)

        return deletedProduct
    },
    updateUser(parent, args, {db}, info){
        const { data, id } = args
        
        const user = db.usersArray.find(user => user.id == id)
        
        if(!user){
            throw new Error('User not found')
        }

        if(typeof data.email == "string"){
            const isEmailTaken = db.usersArray.find(user => user.email == data.email)

            if(isEmailTaken){
                throw new Error("Email has already been taken")
            }

            user.email = data.email
        }

        if(typeof data.name == "string"){
            user.name = data.name
        }

        if(typeof data.age !== "undefined"){
            user.age = data.age
        }
        if(typeof data.age !== "undefined"){
            user.age = data.age
        }

        return user
    },
    updateComment(parent, args, {db, pubsub}, info){
        const {data, id} = args
        const comment = db.commentsArray.find(comm => comm.commId == id)
        const originalComment = {...comment}
        
        if(!comment){
            throw new Error("Comment does not exist")
        }

        if(typeof data.title == "string"){
            comment.title = data.title
        }

        if(typeof data.body == "string"){
            comment.body = data.body
        }
        if(!originalComment){
            pubsub.publish("comment",{
                comment:{
                    mutation:'CREATED',
                    data:comment
                }
            })
        }
        if(originalComment){
            pubsub.publish("comment",{
                comment:{
                    mutation:'UPDATED',
                    data:comment
                }
            })
        }
        
        return comment
    },
    updateReview(parent, {data, id}, {db, pubsub}, info){
        const review = db.reviewsArray.find(rev => rev.id == id)
        const originalReview = {...review}

        if(!review){
            throw new Error('Review does not exist')
        }

        if(typeof data.title == "string"){
            review.title = data.title
        }

        if(typeof data.body == "string"){
            review.body = data.body
        }

        if(typeof data.upvotes =="number"){
            review.upvotes = data.upvotes
        }

        if(typeof data.isPublished =="boolean"){
            review.isPublished = data.isPublished
        }

        if(!originalReview && review.isPublished){
            pubsub.publish("review",{
                review:{
                    mutation:'CREATED',
                    data:review
                }
            })
        }
        if(originalReview && !review.isPublished){
            pubsub.publish("review",{
                review:{
                    mutation:'DELETED',
                    data:review
                }
            })
        }
        if(originalReview && review.isPublished){
            pubsub.publish("review",{
                review:{
                    mutation:'UPDATED',
                    data:review
                }
            })
        }

        return review
    },
    updateProd(parent,{data,id},{db},info){
        const prod = db.prodArray.find(prod => prod.prodID == id)

        if(!prod){
            throw new Error('Product does not exist')
        }

        if(typeof data.name === "string"){
            prod.name = data.name
        }
        if(typeof data.price === "number"){
            prod.price = data.price 
        }
        if(typeof data.stockUnits === "number"){
            prod.stockUnits = data.stockUnits
        }
        if(typeof data.name === "string"){
            prod.name = data.name
        }
        if(typeof data.isAvailable === "boolean"){
            prod.isAvailable = data.isAvailable
        }

        return prod
    }
}

export {Mutation as default}