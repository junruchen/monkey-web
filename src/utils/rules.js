export const rules = {
  required: {
    required: true, message: '必填项'
  },
  name: { // API NAME or PROJECT NAME
    required: true,
    validator: checkName
  },
  projectContext: {
    required: true,
    validator: checkContextUnique
  },
  apiPathUnique: {
    required: true,
    validator: checkApiPathUnique
  }
}

function checkName(rule, value, callback) {
  if (!value) {
    callback('必填项')
  } else if (value.length > 30) {
    callback('长度不可超过30')
  } else {
    callback()
  }
}

function checkContextUnique(rule, value, callback) {
  let contextReg = /^[a-zA-Z-_]+$/g
  if (!value) {
    callback('必填项')
  } else if (!contextReg.test(value)) {
    callback('仅支持大小写字母、数字、短横线与下划线')
  } else {
    callback()
  }
}

function checkApiPathUnique (rule, value, callback) {
  // TODO: 正则不对
  let contextReg = /^[a-zA-Z0-9-_/]+$/g
  if (!value) {
    callback('必填项')
  } else if (!contextReg.test(value)) {
    callback('参考API命名规范, 仅支持大小写字母 数字 - _ /')
  } else {
    callback()
  }
}