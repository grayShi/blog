import '@components/figure.less'
import { Carousel } from 'antd'

const Figure = () => {
  return (
    <div className="figure-body common-box">
      <Carousel autoplay>
        <div>
          <img src="/img/figure/figure_1.jpg" width="100%" />
        </div>
        <div>
          <img src="/img/figure/figure_2.jpg" width="100%" />
        </div>
        <div>
          <img src="/img/figure/figure_3.jpg" width="100%" />
        </div>
      </Carousel>
    </div>
  )
}

export default Figure
