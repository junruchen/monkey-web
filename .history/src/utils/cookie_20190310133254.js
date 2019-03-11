export function getCookiesObj () {
  let cookies = document.cookie
  let cookiesObj = {}
  if (cookies && cookies.length > 0) {
    cookies = cookies.split(';')
    cookies.forEach((item) => {
      let i = item.indexOf('=')
      let len = item.length
      cookiesObj[item.substring(0, i).trim()] = item.substring(i + 1, len)
    })
  }
  return cookiesObj
}