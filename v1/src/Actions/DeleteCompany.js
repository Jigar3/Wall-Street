const DeleteCompany = ( index = 0 ) => {
    return {
        type: "DELETE",
        payLoad: index,
    }
}

export default DeleteCompany;