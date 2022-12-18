import { writable } from 'svelte/store';

export interface UiState {
	showEditorPane: boolean;
}
const initialState: UiState = {
	showEditorPane: false
};

export const stateUi = writable<UiState>(initialState);
