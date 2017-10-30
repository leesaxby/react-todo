const initialState = {
    listItems: [],
    filter: 'ACTIVE'
};

export function todos(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                listItems: [...state.listItems, action.payload],
                filter: state.filter
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
        case 'UPDATE_DONE_STATUS':
            {
                const listItems = Object.assign(state.listItems);
                listItems.find(({
                    _id
                }) => _id === action.payload._id).done = action.payload.done;

                return {
                    listItems,
                    filter: state.filter
                };
            }
        default:
            return state;
    }
}