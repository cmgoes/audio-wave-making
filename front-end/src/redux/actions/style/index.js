
export const handleGraphType = (data) => {
    return dispatch => {
        dispatch({type: "GRAPH_TYPE", data})
    }
}

export const handleBarWidth = (data) => {
    return dispatch => {
        dispatch({type: "BAR_WIDTH", data})
    }
}

export const handleBarSpace = (data) => {
    return dispatch => {
        dispatch({type: "BAR_SPACE", data})
    }
}

export const handleRadius = (data) => {
    return dispatch => {
        dispatch({type: "CIRCLE_RADIUS", data})
    }
}

export const handleRotate = (data) => {
    return dispatch => {
        dispatch({type: "CIRCLE_ROTATE", data})
    }
}

export const handleBarShape = (data) => {
    return dispatch => {
        dispatch({type: "BAR_SHAPE", data})
    }
}