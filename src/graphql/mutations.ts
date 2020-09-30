import { gql } from "@apollo/client"


export const UPLOAD_RESIZE_IMAGE = gql`
    mutation UploadFile($input: UploadFileInput!) {
        uploadFile(input: $input) {
            ok
        }
    }
`
