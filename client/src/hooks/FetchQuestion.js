import { useEffect, useState } from "react";
//import data, { answers } from "../database/data";
import { useDispatch } from "react-redux";

/**redux action */
import * as Action from '../redux/question_reducer';
import { getServerData } from "../helper/helper";





/**fetch question hook to fetch api data and set value to store */

export const useFetchQuestion = () => {
    const dispatch = useDispatch();
    const [getData, setGetData ] = useState({ isLoading: false, apiData: [], serverError: null })

    useEffect(() => {
        setGetData(prev => ({ ...prev, isLoading: true}));

        /**Async function to fetch the backend data */
        (async () => {
            try {
                // let question = await data;
             const [{questions, answers}] =    await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`, (data) => data)
             console.log({questions, answers});

                if(questions.length > 0) {
                    setGetData(prev => ({ ...prev, isLoading: false }));
                    setGetData(prev => ({ ...prev, apiData: {questions, answers} }));

                    /**dispatch an action */
                    dispatch(Action.startExamAction({question: questions, answers }))
                } else {
                    throw new Error("No Question Available");
                }
            } catch (error) {
                setGetData(prev => ({ ...prev, isLoading: false}));
                setGetData(prev => ({ ...prev, serverError: error}));
            }
            
        })();
    }, [dispatch])

    return [getData, setGetData];
}


/**MoveAction Dispatch function */
export const MoveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction()) /**increase trace value by one  */
    } catch (error) {
        console.log(error);
    }

}
/**MovePrevAction Dispatch function */
export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction()) /** decrease the trace value by 1 */
    } catch (error) {
        console.log(error);
    }

}