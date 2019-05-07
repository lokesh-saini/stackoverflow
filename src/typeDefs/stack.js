import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        questions: [Question!]!
        question(id: ID!): Question
    }
    extend type Mutation {
        addQuestion(ques: String!): Question
        addAnswer(quesid: ID!, ans: String!): Answer
        upVoteAnswer(id: ID!): Answer
        downVoteAnswer(id: ID!): Answer
        upVoteQuestion(id: ID!): Question
        downVoteQuestion(id: ID!): Question
        doCorrectAnswer(id: ID!): Answer
        addComment(quesid: ID!, comment: String!): Comment
    }
    type Question {
        id: ID!
        ques: String!
        ansids: [Answer!]!
        user: User!
        vote: Int
        commentids: [Comment!]!
        createdAt: String!

    }
    type Answer {
        id: ID!
        ans: String!
        quesid: ID!
        user: User!
        vote: Int
        correct: Boolean
        createdAt: String!
    }
    type Comment {
        id: ID!
        comment: String!
        userid: User!
        quesid: Question
        createdAt: String!
    }
`
