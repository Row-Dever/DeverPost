import koLocale from 'timeago.js/lib/lang/ko'
import { format, register } from 'timeago.js'

register('ko', koLocale)

export const formatDate = (date) => {
  return format(date, 'ko')
}
