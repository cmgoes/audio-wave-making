// **  Initial State
const initialState = {
    colorList: [],
    selectedColor: {}
}

const color = (state = initialState, action) => {
    switch (action.type) {
        case 'COLORLIST':
            return { ...state, colorList: action.data }
        case 'SELECTEDCOLOR':
            return { ...state, selectedColor: action.data }
        default:
            return state
    }
}

export default color