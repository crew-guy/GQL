import {Prisma} from "prisma-binding"

const prisma = new Prisma({
    typeDefs:"src/generated/prisma.graphql",
    endpoint:"http://localhost:4466"
})



prisma.query.users(null,'{ id name review { name } }')
    .then(data=> console.log(JSON.stringify(data, undefined,2)))
    .catch(err => console.log(err.message))

prisma.query.comments(null, '{ id title body author{ id name} }')
    .then(data=> console.log(JSON.stringify(data, undefined,2)))
    .catch(err => console.log(err.message))

const createCommentString = `data:{
    id:5,
    title:"The noodles are straight from heaven",
    body:"The sauce and vegetables are cooked to perfection, taking a meal there to paradise",
    author:{
      connect:{
        id:4
      }
    }
    review:{
      connect:{
        id:2
      }
    }
}`
prisma.mutation.createComment(createCommentString,'id title body')
    .then(data => console.log(data))
    .catch(err => console.log(err.message); )