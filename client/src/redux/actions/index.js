export function setJwtToken(token) {
    return {
        type: "SET_JWT_TOKEN",
        payload: {
            token: token
        }
    }
}

export function setAuthenticatedUser(user) {
    return {
        type: "SET_AUTHENTICATED_USER",
        payload: {
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            }
        }
    }
}

export function logOutUser() {
    return {
        type: "LOG_OUT_USER"
    }
}