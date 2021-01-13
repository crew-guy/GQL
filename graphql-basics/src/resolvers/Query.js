const Query = {
    greeting(parent, args, { db }, info){
        if(args.name && args.position){
            return `Hello ${args.name} ! You are my favourite ${args.position} `
        } else if(args.name){
            return `Hello ${args.name} !`
        }else {
            return 'Hello !'
        }
    },
    bill(parent,args,{ db },info){
        if(args.prices.length == 0){
            return 0
        }

        return args.prices.reduce((accumulator,currentValue) => accumulator + currentValue)
    },
    prodID(){
        // return 12345
        return '4'
    },
    name(){
        return 'Aloo samosa'
    },
    price(){
        return 12.34
    },
    isAvailable(){
        return true
    },
    stockUnits(){
        return 123
    },
    review(){
        return({
            title:'Sabse best samosa',
            body:'Kya masala tha bc',
            id:'7',
            upvotes:2
        })
    },
    reviews(parent, args, { db }, info){
        if(args.specific){
            return db.reviewsArray.filter(rev => rev.title.toLowerCase().includes(args.specific.toLowerCase()))
        }
        return db.reviewsArray
    },
    availableDishes(parent, args, { db }, info){
        if(args.specific){
            return db.prodArray.filter(prod => prod.name.toLowerCase().includes(args.specific.toLowerCase()))
        }
        else{
            return db.prodArray
        }
    },
    comments(parent, args, { db },info){
        if(!args.specific){
            return db.commentsArray 
        }
        else{
            return db.commentsArray.filter(comment => comment.title.toLowerCase().includes(args.specific.toLowerCase()) || comment.body.toLowerCase().includes(args.specific.toLowerCase)) 
        }
    },
    users(parent,args,{ db },info){
        if(args.name){
            return db.usersArray.filter(user => user.name == args.name)
        }else if(args.email){
            return db.usersArray.filter(user => user.email == args.email)
        
        }else{
            return db.usersArray
        }
    }
}

export {Query as default}