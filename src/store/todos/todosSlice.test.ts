import {todosSlice} from "@/store/todos/todos.slice";
import {ITodo} from "@/store/todos/data/data";

const { todoAdded, todoToggledComplete, clearCompleted } = todosSlice.actions;

describe('todosSlice reducers', () => {
    it('todoAdded', () => {
        const initialState: ITodo[] = [];
        const newState = todosSlice.reducer(initialState, todoAdded('Изучить Redux'));

        expect(newState).toHaveLength(1);
        expect(newState[0]).toEqual({
            id: expect.any(Number),
            name: 'Изучить Redux',
            isComplete: false,
        });
    });

    it('todoToggled', () => {
        const initialState: ITodo[] = [
            { id: 1, name: 'Изучить Redux', isComplete: false },
        ];
        const newState = todosSlice.reducer(initialState, todoToggledComplete(1));

        expect(newState[0].isComplete).toBe(true);
    });

    it('clearCompleted', () => {
        const initialState: ITodo[] = [
            { id: 1, name: 'Изучить Redux', isComplete: true },
            { id: 2, name: 'Написать тесты', isComplete: false },
        ];
        const newState = todosSlice.reducer(initialState, clearCompleted());

        expect(newState).toHaveLength(1);
        expect(newState[0].name).toBe('Написать тесты');
    });
});