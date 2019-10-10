export function getChangeColorFile(mainColor, subColor, normalColor) {
  let arr = [].concat(mainColor, subColor, normalColor)
  return JSON.parse(JSON.stringify(arr))
}
export default {}
