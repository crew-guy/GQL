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