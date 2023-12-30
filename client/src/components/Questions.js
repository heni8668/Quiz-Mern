import React, { useEffect, useState } from 'react';
// import data from '../database/data';
import { useDispatch, useSelector } from 'react-redux';

/**custom hook */
import { useFetchQuestion } from '../hooks/FetchQuestion';
import { updateResult } from '../hooks/setResult';


export default function Questions( { onChecked }) {
    const [checked, setChecked] = useState(undefined);
    const [{ isLoading, apiData, serverError }] = useFetchQuestion()
    // const question = data[0];
    // useSelector(state => console.log(state));

    const questions = useSelector(state => state.questions.queue[state.questions.trace]);
    const {trace} = useSelector(state => state.questions);
    const result = useSelector(state => state.result.result)

    const dispatch = useDispatch()

    useEffect(() => {
        //console.log({trace, checked});

        dispatch(updateResult({ trace, checked }))
    }, [dispatch,trace,checked])


    function onSelect(i) {
       
      //  console.log(i);
       onChecked(i);
       setChecked(i);
       dispatch(updateResult({ trace, checked }))
    }


    if(isLoading) return <h3 className='text-light'>isLoading</h3>
    if(serverError) return <h3 className='text-light'>{serverError}</h3>

    
  return (
    <div className="questions">
      <h2 className="text-light ">{questions?.question}</h2>
      <ul key={questions?.id}>
        {questions?.options.map((q, i) => (
          <li key={q}>
            <input
              type="radio"
              value={checked}
              name="options"
              id={`q${i}-option`}
              onChange={ () =>  onSelect(i) }
            />
            <label className="text-primary" htmlFor={`q${i}-option`}>
              {q}
            </label>
            <div className={`check ${result[trace] === i ? 'checked' : ''}`}></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
