export const postNewMessage = `
mutation exampleMutation (
    $text: String
){
    exampleMutation (
        text: $text
    ){
        id
        text
        created_at
    }
}
`

export const getMyMessageList = `
query getMyMessageList {
    getMyMessageList {
        id
        text
        created_at
    }
}
`