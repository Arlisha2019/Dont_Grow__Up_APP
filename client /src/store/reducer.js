const initialState = {
  checkingBalance: 1500,
  availableBalance: 3000,
  paycheck: 1609,
  rentAmount: 1600,
  paymentAmount: 600,
  balance: 50000,
  savingsBalance: 500,
  vehBalance: 35000

}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case "PAY_CC":
    return {
      ...state,
      checkingBalance: state.checkingBalance - 125,
      availableBalance: state.availableBalance + 125

    }

    case "DEPOSIT_PAYCHECK":
    return {
      ...state,
      checkingBalance: state.checkingBalance + state.paycheck
    }
    case "PAY_RENT":
    return {
      ...state,
      checkingBalance: state.checkingBalance - 1600
    }
    case "PAY_STUDENT_LOAN":
    return {
      ...state,
      checkingBalance: state.checkingBalance - 600,
      balance: state.balance - 600
    }
    case "PAY_VEHICLE_NOTE":
    return {
      ...state,
      checkingBalance:  state.checkingBalance - 1200,
      vehBalance: state.vehBalance - 1200

    }
  }

  return state
}

export default reducer
