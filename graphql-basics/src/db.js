const prodArray = [
    {
        prodID: '1',
        name: 'Lassi',
        price: 24,
        isAvailable: false,
        stockUnits:0,
    },
    {
        prodID: '2',
        name: 'Pav Bhaji',
        price: 35,
        isAvailable:true,
        stockUnits:4,
    },
    {
        prodID: '3',
        name: 'Pulao',
        price: 65,
        isAvailable:true,
        stockUnits:6,
    },
    {
        prodID: '4',
        name: 'Aloo samosa',
        price: 12.34,
        isAvailable:true,
        stockUnits:123,
    },
    
]

let reviewsArray = [
    {
        title:'Nice Lassi',
        body:'Perfect consistency and balance of sweetness and creaminess',
        id:'1',
        upvotes:5,
        parentProdOfRev:'1',
        isPublished:false,
        parentUserOfRev:1    
    },
    {
        title:'Pav was pav-er-ful',
        body:'Brilliantly soft pav cooked to perfection with butter and spices',
        id:'5',
        upvotes:4,
        parentProdOfRev:'2',
        isPublished:true,
        parentUserOfRev:6
    },
    {
        title:'Pulao was amazing',
        body:'Magical balance of rice, vegetables and flavour',
        id:'4',
        upvotes:54,
        parentProdOfRev:'3',
        isPublished:false,
        parentUserOfRev:3   
    },
    {
        title:'Rice in pulao was low quality',
        body:'A very cheap quality rice was used that could not be digested well',
        id:'3',
        upvotes:6,
        parentProdOfRev:'3',
        isPublished:false,
        parentUserOfRev:4  
    },
    {
        title:'Too sweet lassi',
        body:'The lassi unnescesarily had a lot of sugar in it',
        id:'6',
        upvotes:2,
        parentProdOfRev:'1',
        isPublished:true,
        parentUserOfRev:5    
    },
    {
        title:'Pav Bhaji was too spicy',
        body:'Burnt my stomach',
        id:'2',
        upvotes:1,
        parentProdOfRev:'2',
        isPublished:false,
        parentUserOfRev:7   
    },
    {
        title:'Sabse best samosa',
        body:'Kya masala tha bc',
        id:'7',
        upvotes:89,
        parentProdOfRev:'4',
        isPublished:true,
        parentUserOfRev:4
    }
]

let commentsArray = [
    {
        title:'The samosa is indeed that tasty',
        body:"I too had the pleasure of trying it last week, and man........it was the best samosa I've ever had",
        commId :"1",
        parentRevOfComm:'7',
        parentProdOfComm:'4',
        parentUserOfComm:5
    },
    {
        title:'Lassi was too watery',
        body:"When I had gone, there was just wayy too much water in the lassi",
        commId :"2",
        parentRevOfComm:'1',
        parentProdOfComm:'1',
        parentUserOfComm:2
    },
    {
        title:'I had the same problem',
        body:"I guess the spice level in the pav bhaji is actually above the average tolerance",
        commId :"3",
        parentRevOfComm:'2',
        parentProdOfComm:'2',
        parentUserOfComm:7
    },
    {
        title:'Ghanta',
        body:"Itna tatti pulao tha ki I have given up eating rice",
        commId :"4",
        parentRevOfComm:'4',
        parentProdOfComm:'3',
        parentUserOfComm:4
    },
    {
        title:'I think you are overtly critic',
        body:"I think the lassi was perfect in sugar and don't understand why you find fault with everything in life",
        commId :"5",
        parentRevOfComm:'6',
        parentProdOfComm:'1',
        parentUserOfComm:1
    },
    {
        title:'I disagree',
        body:". The samosa is nothing but a pile of deeply fried, high cholestrol bullshit",
        commId :"6",
        parentRevOfComm:'7',
        parentProdOfComm:'4',
        parentUserOfComm:6
    },
    {
        title:"I was offered no such treatment",
        body:"In fact, when I had gone, there was barely any butter in any of the dishes I had ordered, let alone, pav bhaji",
        commId :"7",
        parentRevOfComm:'3',
        parentProdOfComm:'2',
        parentUserOfComm:5
    },
    {
        title:"Yeah, it's better than most biryani's I've had",
        body:"The pulao was so tenderly and beautifully cooked that I wish to dedicate my entire rice plantation to this restaurant",
        commId :"8",
        parentRevOfComm:'4',
        parentProdOfComm:'3',
        parentUserOfComm:7
    },
    {
        title:'I really think it is overpriced tho',
        body:"I have had pav bhaji at other places too but nowhere is it so overpriced",
        commId :"9",
        parentRevOfComm:'5',
        parentProdOfComm:'2',
        parentUserOfComm:1
    },
    {
        title:'Yes, so were the vegetables',
        body:"The pulao did lack in ingredients quality",
        commId :"10",
        parentRevOfComm:'3',
        parentProdOfComm:'3',
        parentUserOfComm:3
    },
]

let usersArray = [
    {
        name:'Ankit',
        id:"1",
        email:'Ankit@graphql.com',
        age:19,
        favouriteProd:1

    },
    {
        name:'Jay',
        id:"2",
        email:'Jay@graphql.com',
        age:20,
        favouriteProd:4

    },
    {
        name:'Dhruvi',
        id:"3",
        email:'Dhruvi@graphql.com',
        age:18,
        favouriteProd:3

    },
    {
        name:'Pratik',
        id:"4",
        email:'Pratik@graphql.com',
        age:22,
        favouriteProd:2

    },
    {
        name:'Dhruv',
        id:"5",
        email:'Dhruv@graphql.com',
        age:20,
        favouriteProd:2

    },
    {
        name:'Dhriti',
        id:"6",
        email:'Dhriti@graphql.com',
        age:20,
        favouriteProd:4

    },
    {
        name:'Yashika',
        id:"7",
        email:'Yashika@graphql.com',
        age:19,
        favouriteProd:1

    },
]

const db = {
    usersArray,
    prodArray,
    reviewsArray,
    commentsArray
}

export {db as default}