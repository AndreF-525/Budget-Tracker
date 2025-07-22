import { useMemo } from "react"
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
 } from 'react-swipeable-list'
import { formatDate } from "../helpers"
import type { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import 'react-swipeable-list/dist/styles.css'
import { useBudget } from "../hooks/useBudget"

type ExpenseDetailsProps = {
  expense: Expense
}

export default function ExpenseDetails({ expense }: ExpenseDetailsProps) {

  const {dispatch} = useBudget()

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => dispatch({type: 'edit-expense', payload: {id : expense.id}})}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => dispatch({type: 'remove-expense', payload: {id : expense.id}}) }
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )
  
  const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0],[expense])

  return (
    <SwipeableList>
      <SwipeableListItem maxSwipe={1.0} leadingActions={leadingActions()} trailingActions={trailingActions()}>
        <section className="flex gap-2 items-center bg-white shadow-lg p-5 w-full border-b border-gray-200">
          <div>
            <img
              src={`/icono_${categoryInfo.icon}.svg`}
              alt="Icono gasto"
              className="w-20 max-sm:w-10"
            />
          </div>

          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500">{ categoryInfo.name }</p>
            <p>{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
          </div>

          <AmountDisplay
            amount={expense.amount}
          />
        </section>
      </SwipeableListItem>
    </SwipeableList>
  )
}

  //Ese ! en la linea 17 es una forma de dar certeza que el valor existira

