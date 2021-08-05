export const audioList = data => {
    return dispatch => {
        dispatch({ type: 'AUDIOLIST', data })
    }
}

export const selectedAudio = data => {
    return dispatch => {
        dispatch({ type: 'SELECTEDAUDIO', data })
    }
}