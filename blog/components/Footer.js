import '@components/footer.scss'
import { Affix, Row, Col } from 'antd'

const Footer = () => (
  <Affix offsetBottom={0}>
    <Row>
      <Col xs={0} sm={0} md={0} lg={24} xl={24}>
        <div className="footer-div">
          <div>系统由React+Node+Ant Design</div>
        </div>
      </Col>
    </Row>
  </Affix>
)

export default Footer
