const initialState = {
        listItems: [],
        filter: 'ACTIVE'
};

export function todos(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                todos: {
                    listItems: [ ...state.todos.listItems, { text: action.payload, done: false }]
                }
            };
        case 'FETCH_TODOS_SUCCESS':
            return {
                            listItems: action.payload,
                            filter: state.filter

                    };
        case 'UPDATE_FILTER':
            return {
                listItems: state.listItems,
                filter: action.payload
            };
        default:
            return state;
    }
}