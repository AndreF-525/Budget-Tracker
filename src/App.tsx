import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpensesList from "./components/ExpensesList"
import CategoryFilter from "./components/CategoryFilter"

function App() {
  const { state } = useBudget()
  console.log(state.budget)

  const isBudgetValid = useMemo(() => state.budget > 0, [state.budget])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  } ,[state])

  return (
    <>
      <header className="bg-[#2C3E50] py-8 max-sm:py-3 max-h-72">
        <h1 className="text-4xl text-[#E2F3F9] text-center font-black">Planificador de Gastos</h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isBudgetValid ? <BudgetTracker /> : <BudgetForm/>}
      </div>

      {isBudgetValid && (
        <main className="max-w-3xl mx-auto py-10">
          <CategoryFilter />
          <ExpensesList />
          <ExpenseModal />
        </main>
      )}
    </>
  )
}

export default App
