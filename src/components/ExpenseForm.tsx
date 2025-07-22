import { categories } from "../data/categories"
import DatePicker from "react-date-picker"
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { useEffect, useState, type ChangeEvent } from "react"
import type { DraftExpense, Value } from "../types"
import ErrorMessage from "./ErrorMessage"
import { useBudget } from "../hooks/useBudget"

export default function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date()
  })

  const [error, setError] = useState('')
  const { dispatch, state, remainingBudget } = useBudget()
  const [previousAmount, setPreviousAmount] = useState(0)
  
  useEffect(() => {
    if (state.editingID) {
      const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingID)[0]
      setExpense(editingExpense)
      setPreviousAmount(editingExpense.amount)
    }
  } ,[state.editingID])

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    const isAmountField = ['amount'].includes(name)

    setExpense({
      ...expense,
      [name]: isAmountField ? Number(value) : value
    })
  }

  const handleChangeDate = (value : Value) => {
    setExpense({
      ...expense,
      date: value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //Validar
    if (Object.values(expense).includes('')) {
      setError('Todos los campos son obligatorios')
      return
    }

    //Validar NO sobregirar el presupuesto:
    if ((expense.amount - previousAmount) > remainingBudget) {
      setError('Este gasto se sale del presupuesto!')
      return
    }

    //Agregar o editar gasto:
    if (state.editingID) {
      dispatch({type: 'updated-expense', payload: {expense: {id: state.editingID, ...expense}}})
    } else {
      dispatch({ type: 'add-expense', payload: { expense } })
    }
    
    //Reiniciar el state:
    setExpense({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date()
    })

    setPreviousAmount(0)
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-[#2C3E50] py-2">
        {state.editingID ? 'Editar Información' : 'Nuevo Gasto'}
      </legend>

      {error && <ErrorMessage>{ error }</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre gasto:
        </label>

        <input
          type="text"
          id="expenseName"
          placeholder="Nombre del gasto"
          name="expenseName"
          className="bg-slate-100 p-2"
          onChange={handleChange}
          value={expense.expenseName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad gasto:
        </label>

        <input
          type="number"
          id="amount"
          placeholder="Cantidad del gasto. Ej. 500"
          name="amount"
          className="bg-slate-100 p-2"
          onChange={handleChange}
          value={expense.amount}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Categoría:
        </label>

        <select
          id="category"
          name="category"
          className="bg-slate-100 p-2"
          onChange={handleChange}
          value={expense.category}
        >
          <option>-- Seleccione --</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Fecha gasto:
        </label>

        <DatePicker
          className='bg-slate-100 p-2 border-0'
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input
        type="submit"
        className="text-white uppercase font-bold w-full p-2 bg-[#2C3E50] rounded-lg"
        value={state.editingID ? 'Guardar Cambios' : 'Registrar Gasto'}
      />
    </form>
  )
}
