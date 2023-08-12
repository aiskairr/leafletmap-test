import { configureStore } from '@reduxjs/toolkit'
import routes from "./slices/routeReducers"

export const store = configureStore({
  reducer: {
    routes: routes
  },
})