export function tooManyResultsError() {
  return {
    type: "tooManyResults",
    message: `Too many results`,
  };
}
