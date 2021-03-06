
import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromProjects from './projects.reducer';
import * as fromTodos from './todos.reducer';
import * as fromModels from '../models';
export interface AppState {
  projects: fromProjects.ProjectState;
  todos: fromTodos.TodoState;
}

export const reducers: ActionReducerMap<AppState> = {
  projects: fromProjects.reducer,
  todos: fromTodos.reducer
};

// Selectors

// One per "branch" of the state.

const selectProjectBranch = (state: AppState) => state.projects;
const selectTodosBranch = (state: AppState) => state.todos;


// Any Helpers?

const { selectEntities: selectTodoEntities } = fromTodos.adapter.getSelectors(selectTodosBranch);
const selectTodoSorts = createSelector(selectTodosBranch, b => b.sort);
// Selectors for Components

// Observable<TodoItem[]>

// export const selectAllTodoList = createSelector(
//   selectTodoEntities,
//   selectTodoSorts, // ['2', '1', '3']
//   (entities, sort) => {
//     console.log({ sort });
//     const result = sort.map(s => entities[s]);
//     console.log({ result });
//     return result as fromModels.TodoItem[];
//   }
// );

// export const selectInboxTodoList = createSelector(
//   selectAllTodoList,
//   (todos) => todos.filter(t => !t.project)
// );

const selectSortedTodos = createSelector(selectTodoSorts, selectTodoEntities,
  (sort, entities) => sort.map(s => entities[s])
);

export const selectInboxTodoList = createSelector(
  selectSortedTodos,
  (todos) => todos.filter(t => !t.project)
);
