// **  Initial State
const initialState = {
    displayText: "",
    textFont: "Alfa Slab One",
    textColor: "#000000",
    fontSize: 72,
    textJustification: 1,
    textVerticalAlign: 1
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
        case 'TEXTJUSTIFICATION':
            return { ...state, textJustification: action.data }
        case 'TEXTVERTICALALIGN':
            return { ...state, textVerticalAlign: action.data }
        default:
            return state
    }
}

export default text