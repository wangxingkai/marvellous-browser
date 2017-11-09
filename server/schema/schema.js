export default`
type Comics {
  comics: [Comics]
}

type Comic {
  id: Int!
  title: String
  thumbnail: String
  images: [String]
  hasImages: Boolean
  description: String
  characters: [Character]
  creators: [Creator]
}

type Characters {
  characters: [Characters]
}

type Character {
  id: Int!
  name: String
  role: String
  description: String
  thumbnail: String
  hasImages: Boolean,
  comicsTotal: Int
  comics: [Comic]
}

type Creators {
  creators: [Creators]
}

type Creator {
  id: Int!
  fullName: String
  suffix: String
  thumbnail: String,
  hasImages: Boolean,
  comicsTotal: Int
  comics: [Comic]
}

# a user
type User{
  email:String
}

# login payload
input UserCredentialInput{
  email:String!
  password:String!
}

# indicate if the user already exists
type EmailAvalibilityCheckResult{
  isUserExist:Boolean
}

type Query {
  # login a user with credential
  login(credential:UserCredentialInput!):User
  
  # check if an user exists
  isEmailRegistered(email:String!):EmailAvalibilityCheckResult

  comic(id: Int!): Comic
  comics(
    start: Int = 0, 
    limit: Int = 12, 
    orderBy: String,
    titleStartsWith: String,
    characterIds: [Int]
  ): [Comic]
  
  character(id: Int!): Character
  characters(
    start: Int = 0,
    limit: Int = 12,
    orderBy: String,
    nameStartsWith: String
  ): [Character]
  
  creator(id: Int!): Creator
  creators(
    start: Int = 0,
    limit: Int = 12,
    orderBy: String,
    nameStartsWith: String
  ): [Creator]
}

type Mutation{
  # create a user with given credential. error when create failed.
  createUser(credential:UserCredentialInput!):User
}

`
