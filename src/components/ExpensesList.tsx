import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetails from "./ExpenseDetails"

export default function ExpensesList() {
  const { state } = useBudget()
  
  const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses

  const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])
  
  return (
    <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
      {
        isEmpty
          ? <p className="text-gray-600 text-2xl font-bold px-2">No hay gastos</p>
          : (
            <>
              <p className="text-gray-600 text-2xl font-bold my-5 px-2">Listado de Gastos:</p>
              {filteredExpenses.map(expense => (
                <ExpenseDetails
                  key={expense.id}
                  expense={expense}
                />
              ))}
            </>
          )
      }
    </div>
  )
}
