import '@components/footer.scss'
import { Affix } from 'antd'

const Footer = () => (
  <Affix offsetBottom={0}>
    <div className="footer-div">
      <div>系统由React+Node+Ant Design</div>
    </div>
  </Affix>
)

export default Footer
