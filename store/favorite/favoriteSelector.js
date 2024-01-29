import { createSelector } from "@reduxjs/toolkit";
const favoriteState = (state) => state.favorite;
export const favoriteListSelector = createSelector(
  [favoriteState],
  (favoriteState) => favoriteState.list
);
