import React from 'react'
import styles from './css/customInfo.module.css'
import { withRouter } from 'react-router-dom'
import { Button, Row, Col, Divider } from 'antd'
import { fetch } from '../../../fetch/fetch'

function initSex (sex) {
  if (sex === '1') {
    return '男'
  } else if (sex === '0') {
    return '女'
  } else {
    return '男/女'
  }
}

class CustomInfo extends React.Component {
  constructor (props) {
    super(props)
    this.back = this.back.bind(this)
  }
  back () {
    this.props.history.push('/custom')
  }
  state = {
    name: '',
    sex: '',
    age: '',
    type: '',
    label: '',
    channel: '',
    info: '',
    imgList: [],
  }
  componentDidMount () {
    const id = this.props.location.pathname.split('/')[2]
    // console.log(url)
    fetch({
      url: 'http://localhost:8080/retrieve/custom/queryDetail',
      method: 'post',
      data: JSON.stringify({
        customId: id
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => {
      this.setState({
        ...res.data.data
      })
    })
  }
  render() {
    return (
      <div className={styles.sceneInfo}>
        <div className={styles.header}>
          <Button type="primary" size="small" onClick={this.back}>返回</Button>
        </div>
        <div>
          <Row>
            <Col span={16}>
              <Row className={styles.disc}>
                <Col span={3}>
                  名称：
                </Col>
                <Col span={19}>
                  {this.state.name}
                </Col>
              </Row>
              <Row className={styles.disc}>
                <Col span={3}>
                  性别：
                </Col>
                <Col span={19}>
                  {initSex(this.state.sex)}
                </Col>
              </Row>
              <Row className={styles.disc}>
                <Col span={3}>
                  年龄：
                </Col>
                <Col span={19}>
                  {this.state.age}
                </Col>
              </Row>
              <Row className={styles.disc}>
                <Col span={3}>
                  类别：
                </Col>
                <Col span={19}>
                  {this.state.type}
                </Col>
              </Row>
              <Row className={styles.disc}>
                <Col span={3}>
                  类目：
                </Col>
                <Col span={19}>
                  {this.state.label}
                </Col>
              </Row>
              <Row className={styles.disc}>
                <Col span={3}>
                  渠道：
                </Col>
                <Col span={19}>
                  {this.state.channel}
                </Col>
              </Row>
              <Row className={styles.disc}>
                <Col span={3}>
                  详细信息：
                </Col>
                <Col span={19}>
                  {this.state.info}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Divider />
        <div style={{width: '100%'}}>
          {
            this.state.imgList.length?this.state.imgList.map((item, index) => (
              <div key={index} className={styles.customInfoPic}>
                <img className={styles.pic} src={item} alt="" />
              </div>
            )):<div className={styles.noData}>暂无数据</div>
          }
        </div>
      </div>
    )
  }
}

export default withRouter(CustomInfo)