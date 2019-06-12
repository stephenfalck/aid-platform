export function fetchRequests(requests) {
    return {
        type: "FETCH_REQUESTS",
        payload: {
            requests: requests
        }
    }
}

export function receiveRequests(requestsData) {
    return {
        type: 'RECEIVE_REQUESTS',
        requests: requestsData
    }
}