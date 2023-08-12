import { createSlice } from "@reduxjs/toolkit";

const routeSlice = createSlice({
  name: "route",
  initialState: {
    routes: [
      [
        [59.84660399, 30.29496392],
        [59.82934196, 30.42423701],
        [59.83567701, 30.38064206],
      ],
      [
        [59.82934196, 30.42423701],
        [59.82761295, 30.41705607],
        [59.84660399, 30.29496392],
      ],
      [
        [59.83567701, 30.38064206],
        [59.84660399, 30.29496392],
        [59.82761295, 30.41705607],
      ],
    ],
    selectedRouteIndex: [
      [59.84660399, 30.29496392],
      [59.82934196, 30.42423701],
      [59.83567701, 30.38064206],
    ],
  },
  reducers: {
    setSelectedRoute: (state, action) => {
      state.selectedRouteIndex = action.payload;
    },
  },
});

export const { setSelectedRoute } = routeSlice.actions;
export default routeSlice.reducer;
