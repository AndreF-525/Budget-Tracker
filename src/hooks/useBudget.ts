import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"


export const useBudget = () => {
  const context = useContext(BudgetContext)

  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider')
    //Esto es una buena practica por si no existe un context
  }
  return context
}

//De esta forma usamos el Context que creamos por medio del hook, en lugar de tenerlo directamente en la app
