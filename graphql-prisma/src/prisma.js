import {Prisma} from "prisma-binding"

const prisma = new Prisma({
    typeDefs:"src/generated/prisma.graphql",
    endpoint:"http://localhost:4466"
})



prisma.query.users(null,'{ id name reviews {id title } }')
    .then(data=> console.log(JSON.stringify(data, undefined,2)))
    .catch(err => console.log(err.message))

prisma.query.comments(null, '{ id title body author{ id name} }')
    .then(data=> console.log(JSON.stringify(data, undefined,2)))
    .catch(err => console.log(err.message))

// prisma.query.users(null, '{ id name posts { id title } }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.query.comments(null, '{ id text author { id name } }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// })

prisma.mutation.createComment(
  {data:{
    id:6,
    title:"The noodles are really good",
    body:"This dish is a symphony of flavours",
    author:{
      connect:{
        id:5
      }
    },
    review:{
      connect:{
        id:2
      }
    }
}}
  ,'{id title body}')
    .then(data => console.log(data))
    .catch(err => console.log(err.message))