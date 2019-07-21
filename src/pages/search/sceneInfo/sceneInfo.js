import React from 'react'
import styles from './css/sceneInfo.module.css'
import { withRouter } from 'react-router-dom'
import { Button, Row, Col } from 'antd'
import { fetch } from '../../../fetch/fetch'

class SceneInfo extends React.Component {
  constructor (props) {
    super(props)
    this.back = this.back.bind(this)
  }
  back () {
    this.props.history.push('/scenes')
  }
  state = {
    name: '',
    nature: '',
    years: '',
    type: '',
    feature: '',
    stage: '',
    address: '',
    information: '',
    expense: '',
    url: ''
  }
  componentDidMount () {
    const id = this.props.location.pathname.split('/')[2]
    // console.log(url)
    fetch({
      url: '/api/retrieve/area/queryDetail',
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
      console.log(this.state)
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
                  性质：
                </Col>
                <Col span={19}>
                  {this.state.nature}
                </Col>
              </Row>
              <Row className={styles.disc}>
                <Col span={3}>
                  年代：
                </Col>
                <Col span={19}>
                  {this.state.years}
                </Col>
              </Row>
              <Row className={styles.disc}>
                <Col span={3}>
                  类型：
                </Col>
                <Col span={19}>
                  {this.state.type}
                </Col>
              </Row>
              <Row className={styles.disc}>
                <Col span={3}>
                  特点：
                </Col>
                <Col span={19}>
                  {this.state.feature}
                </Col>
              </Row>
              <Row className={styles.disc}>
                <Col span={3}>
                  信息：
                </Col>
                <Col span={19}>
                  {this.state.information}
                </Col>
              </Row>
              <Row className={styles.disc}>
                <Col span={3}>
                  地址：
                </Col>
                <Col span={19}>
                  {this.state.address}
                </Col>
              </Row>
              <Row className={styles.disc}>
                <Col span={3}>
                  费用：
                </Col>
                <Col span={19}>
                  {this.state.expense}
                </Col>
              </Row>
              <Row className={styles.disc}>
                <Col span={3}>
                  星级：
                </Col>
                <Col span={19}>
                  {this.state.stage}
                </Col>
              </Row>
              <Row className={styles.disc}>
                <Col span={3}>
                  场地全景：
                </Col>
                <Col span={19}>
                  <a href={this.state.url} target="_blank" rel="noopener noreferrer">{this.state.url}</a>
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <img className={styles.sceneMainPic} src={this.props.location.query.imgUrl} alt="" />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default withRouter(SceneInfo)