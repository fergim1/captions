import { atom } from 'nanostores';

const INITIAL_VALUE = {
  status: null,
  summary: "",
  main_points: [],
  exercises: {
    multiple_choice: [{
      question: "",
      options: [],
      correct_answer: null,
      text_reference: ""
    }],
    true_false: [
      {
        statement: "",
        correct_answer: null,
        text_reference: ""
      }
    ]
  }
}
export const deepseekResponse = atom(INITIAL_VALUE);

export const updatemDeepseekResponse = (resp) => {
  deepseekResponse.set(resp);
};