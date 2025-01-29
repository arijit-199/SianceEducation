export const apiErrorHandler = (error) => {
    return error.response.data.message || error.message || error.response.message || error.data.message
}


export const concatString = (arr) => {
    let concattedString = "";
    arr.map(char => {
        concattedString += char;
    })
    return concattedString
}