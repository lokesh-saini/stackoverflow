import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        questions: [Question!]!
        question(id: ID!): Question
    }
    extend type Mutation {
        addQuestion(ques: String!): Question
        addAnswer(quesid: ID!, ans: String!): Answer
    }
    type Question {
        id: ID!
        ques: String!
        ansids: [Answer!]!
        createdAt: String!
    }
    type Answer {
        id: ID!
        ans: String!
        quesid: ID!
    }
`
