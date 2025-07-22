import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

export default function BudgetForm() {
  const [budget, setBudget] = useState(0)
  const { dispatch } = useBudget()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber)
  }

  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0
  }, [budget])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({type: 'add-budget', payload: {budget}})
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label htmlFor="budget" className="text-4xl text-[#2C3E50] font-bold text-center">
          Definir presupuesto
        </label>
        <input
          type="number"
          className="w-full bg-white border border-gray-200 p-2"
          placeholder="Introduce tu presupuesto"
          name="budget"
          id="budgetID"
          value={budget}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        value="Definir presupuesto"
        className="w-full text-white font-black p-2 bg-[#2C3E50] hover:bg-[#7FB3D5] cursor-pointer uppercase disabled:bg-gray-400"
        disabled={isValid}
      />
    </form>
  )
}
