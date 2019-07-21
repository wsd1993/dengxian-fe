import React from 'react'
import styles from './css/actorinfo.module.css'
import { Button, Divider, Row, Col } from 'antd'
import { withRouter } from 'react-router-dom'
import { fetch } from '../../../fetch/fetch'

class ActorInfo extends React.Component {
  constructor(props) {
    super(props)
    this.back = this.back.bind(this)
  }
  state = {
    name: '',
    birthday: '',
    country: '',
    detail: '',
    hobby: '',
    sex: '',
    imgList: [],
    imgUrl: '',
    videoUrl: ''
  }
  back() {
    // console.log(this.props)
    this.props.history.push('/actors')
  }
  componentDidMount () {
    const id = this.props.location.pathname.split('/')[2]
    // console.log(url)
    fetch({
      url: 'http://localhost:8080/retrieve/actor/queryDetail',
      method: 'post',
      data: JSON.stringify({
        id
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => {
      this.setState({
        ...res.data.data
      })
      // console.log(this.state)
    })
  }
  render() {
    return (
      <div className={ styles.actorinfo }>
        <div className={ styles.header }>
          <Button onClick={ this.back } type="primary" size="small">返回</Button>
        </div>
        <div>
          <Row>
            <Col span={16}>
              <Row>
                <Col span={3}>
                  姓名：
                </Col>
                <Col span={19}>
                  {this.state.name}
                </Col>
              </Row>
              <Row>
                <Col span={3}>
                  性别：
                </Col>
                <Col span={19}>
                  {this.state.sex===1?'男':'女'}
                </Col>
              </Row>
              <Row>
                <Col span={3}>
                  出生日期：
                </Col>
                <Col span={19}>
                  {this.state.birthday}
                </Col>
              </Row>
              <Row>
                <Col span={3}>
                  年龄：
                </Col>
                <Col span={19}>
                  {this.state.age}
                </Col>
              </Row>
              <Row>
                <Col span={3}>
                  国籍：
                </Col>
                <Col span={19}>
                  {this.state.country}
                </Col>
              </Row>
              <Row>
                <Col span={3}>
                  特长：
                </Col>
                <Col span={19}>
                  {this.state.hobby}
                </Col>
              </Row>
              <Row>
                <Col span={3}>
                  详细信息：
                </Col>
                <Col span={19}>
                  {this.state.detail}
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <img className={styles.actorMainPic} src={this.props.location.query.imgUrl} alt="" />
            </Col>
          </Row>
        </div>
        <Divider />
        <div style={{width: '100%'}}>
          <Row>
            <Col span={12}>
              <div className={styles.title}>其他图片</div>
              {
                this.state.imgList.length?this.state.imgList.map((item, index) => (
                  <div key={index} className={styles.actorExtraPic}>
                    <img className={styles.actorMainPic} src={item} alt="" />
                  </div>
                )):<div className={styles.noData}>暂无数据</div>
              }
            </Col>
            <Col span={12}>
              <div className={styles.title}>视频</div>
              <div className={styles.video}>
                <video width="600px" height="800px" controls="controls" autoPlay="autoplay" src={this.state.videoUrl}></video>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default withRouter(ActorInfo)