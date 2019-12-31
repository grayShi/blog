import { Avatar, Divider } from 'antd'
import '@components/author.scss'

const Author = () => {
  return (
    <div className="author-div common-box">
      <div>
        <Avatar size={100} src="" />
      </div>
      <div className="author-introduction">
        123123123123
        <Divider>社交账号</Divider>
        <Avatar size={28} icon="github" className="account-git" />
        <Avatar size={28} icon="wechat" className="account-wechat" />
        {/* <Avatar size={28} icon="wechat" className="account" /> */}
      </div>
    </div>
  )
}

export default Author
