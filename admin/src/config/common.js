import { message } from 'antd'

export const onSuccess = msg => {
  message.success(msg)
}

export const onError = msg => {
  message.error(msg)
}

export const formatQuery = search => {
  if (!search) {
    return {}
  }
  const queryString = `${search}#`.match(/\?(\S*?)\#/)
  if (queryString) {
    const queryArray = queryString[1].split('&')
    const query = {}
    queryArray.forEach(item => {
      const mysQuery = item.split('=')
      query[mysQuery[0]] = isNaN(mysQuery[1])
        ? mysQuery[1]
        : Number(mysQuery[1])
    })
    return query
  }
  return {}
}
