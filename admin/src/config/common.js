import { message } from 'antd'

export const onSuccess = msg => {
  message.success(msg)
}

export const onError = msg => {
  message.error(msg)
}
