import { atom } from 'nanostores';

const INITIAL_VALUE = {
  status: null,
  summary: "",
  main_points: [],
  exercises: {
    multiple_choice: [],
    true_false: []
  }
}
export const deepseekResponse = atom(INITIAL_VALUE);

export const updateDeepseekResponse = (resp) => {
  deepseekResponse.set(resp);
};