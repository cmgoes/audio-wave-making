// **  Initial State
const initialState = {
    displayText: "",
    textFont: "cardo",
    textColor: "#000000",
    fontSize: 72
}

const text = (state = initialState, action) => {
    switch (action.type) {
        case 'SETTEXT':
            return { ...state, displayText: action.data }
        case 'SETFONT':
            return { ...state, textFont: action.data }
        case 'SETTEXTCOLOR':
            return { ...state, textColor: action.data }
        case 'SETFONTSIZE':
            return { ...state, fontSize: action.data }
        default:
            return state
    }
}

export default text