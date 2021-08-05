// **  Initial State
const initialState = {
    audioList: []
}

const audio = (state = initialState, action) => {
    switch (action.type) {
        case 'AUDIOLIST':
            return { ...state, audioList: action.data }
        case 'SELECTEDAUDIO':
            return { ...state, selectedAudio: action.data }
        default:
            return state
    }
}

export default audio