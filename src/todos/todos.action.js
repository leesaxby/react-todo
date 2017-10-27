export function addTodo(todo) {
    return dispatch => {
        return fetch(`http://178.62.117.150:3000/todos/`, {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(todo => {
            dispatch({
                type: 'ADD_TODO',
                payload: todo
            });
        })
        .catch(err => console.log(err));
    };
}

export function fetchTodos() {
    return dispatch => {
        return fetch(`http://178.62.117.150:3000/todos/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(todos => {

            dispatch({
                type: 'FETCH_TODOS_SUCCESS',
                payload: todos
            });
            //   this.todoPoll = setTimeout(this.getTodos, 5000);
        })
        .catch(err => {
            // this.todoPoll = setTimeout(this.getTodos, 5000);
            console.log(err);
        });
    };
}

export function updateFilter(filter) {
    return {
        type: 'UPDATE_FILTER',
        payload: filter
    };
}

export function updateDoneStatus(id, doneStatus) {
    return dispatch => {
        return fetch(`http://178.62.117.150:3000/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ done: !doneStatus }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(todo => {
            dispatch({
                type: 'UPDATE_DONE_STATUS',
                payload: todo
           });
        })
        .catch(err => console.log(err));
    };
}