// 时间格式化处理
export function standardTimeFormat (val) {
  if (val) {
    let d = getDate(val)
    let time = d.year + '-' + d.month + '-' + d.day + ' ' + d.hour + ':' + d.minute + ':' + d.second
    return time
  }
}

// 几秒前 几分钟前 几小时前 几天前 几周前 几个月前 半年前  几年前
export function beforeTimeFormat (val) {
  if (val) {
    val = compatibleBrowser(val)
    var mistiming = new Date().getTime() - new Date(val).getTime()
    var postfix = mistiming > 0 ? '前' : '后'
    var unit = ['年', '个月', '星期', '天', '小时', '分钟', '秒']
    var poor = [31536000000, 2592000000, 604800000, 86400000, 3600000, 60000, 1000]
    for (let i = 0; i < unit.length; i++) {
      let num = Math.floor(mistiming / poor[i])
      if (num !== 0) {
        return Math.abs(num) + unit[i] + postfix
      }
    }
  }
}

function getDate (val) {
  val = compatibleBrowser(val)
  let d = new Date(val)
  let year = d.getFullYear()
  let month = stringFormat(d.getMonth() + 1)
  let day = stringFormat(d.getDate())
  let hour = stringFormat(d.getHours())
  let minute = stringFormat(d.getMinutes())
  let second = stringFormat(d.getSeconds())
  return {
    year, month, day, hour, minute, second
  }
}

function stringFormat (val) {
  return val.toString().length === 1 ? '0' + val : val
}

function compatibleBrowser (val) {
  // safari兼容处理
  if (isNaN(new Date(val))) {
    val = val.replace(/-/g, '/')
  }
  return val
}