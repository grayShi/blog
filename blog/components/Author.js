import { Avatar, Divider } from 'antd'
import '@components/author.scss'

const Author = () => {
  // const readFile = async () => {
  //   const file = await fs.readFile('', (err ,data => {
  //     if (err) throw err
  //     return data
  //   }))

  //   console.log(file)
  // }

  return (
    <div className="author-div common-box">
      <div>
        <Avatar size={100} src="/img/author.jpg" />
      </div>
      <div className="author-introduction">
        池鱼可爱多
        <Divider>社交账号</Divider>
        <Avatar size={28} icon="github" className="account-git" />
        <Avatar size={28} icon="wechat" className="account-wechat" />
        {/* <Avatar size={28} icon="wechat" className="account" /> */}
      </div>
    </div>
  )
}

export default Author
