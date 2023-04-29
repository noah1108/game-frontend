import * as md from 'react-icons/md'
import * as fa from 'react-icons/fa'
import * as bs from 'react-icons/bs'
import _ from 'lodash'

const icons = {
  md,
  fa,
  bs,
}

/**
 * アイコンロード部品
 *
 * 以下サイトから使用アイコンを選択。
 * https://react-icons.github.io/react-icons/
 *
 * ex) const Icon = IconLoader("md","MdSettings")
 *     return <Icon/>
 */

const IconLoader = (type, icon) =>
  _.get(icons, `${type}.${icon}`, () => {
    console.warn('Warning: icon not found.')
    return <></>
  })

export default IconLoader
