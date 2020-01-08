import '@components/figure.less'
import { Carousel } from 'antd'

const Figure = () => {
  return (
    <div className="figure-body common-box">
      <Carousel autoplay>
        <div>
          <img src="/img/figure/figure_1.jpg" />
        </div>
        <div>
          <img src="/img/figure/figure_2.jpg" />
        </div>
        <div>
          <img src="/img/figure/figure_3.jpg" />
        </div>
      </Carousel>
    </div>
  )
}

export default Figure
