import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget"
import 'react-circular-progressbar/dist/styles.css'

export default function BudgetTracker() {

  const { state, totalExpenses, remainingBudget, dispatch } = useBudget()

  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)
  console.log(percentage)

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percentage}
          className=''
          styles={buildStyles({
            pathColor: percentage >= 80 ? '#DC2626' : '#2C3E50',
            trailColor: '#F5F5F5',
            textSize: 10,
            textColor: percentage >= 80 ? '#DC2626' : '#2C3E50'
          })}
          text={`${percentage}% Gastado`}
        />
      </div>

      <div className="flex flex-col justify-center gap-8">
        <button
          type="button"
          className="bg-red-500 hover:bg-red-800 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
          onClick={() => dispatch({type: 'reset-app'})}
        >
          Resetear App
        </button>

        <AmountDisplay label='Presupuesto' amount={state.budget} />
        <AmountDisplay label='Disponible' amount={remainingBudget} />
        <AmountDisplay label='Gastado' amount={totalExpenses} />
      </div>
    </section>
  )
}
