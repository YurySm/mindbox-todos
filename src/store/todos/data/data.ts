export interface ITodo {
    id: number;
    name: string;
    isComplete: boolean;
}

export const todosList: ITodo[] = [
    {
        id: 1,
        name: 'Тестовое задание',
        isComplete: false,
    },
    {
        id: 2,
        name: 'Прекрасный код',
        isComplete: true,
    },
    {
        id: 3,
        name: 'Покрыть тестами',
        isComplete: false,
    },
]