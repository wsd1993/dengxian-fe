import React from 'react'
import styles from './css/toolsInfo.module.css'
import { withRouter } from 'react-router-dom'
import { Button, Row, Col } from 'antd'
import { fetch } from '../../../fetch/fetch'

class ToolsInfo extends React.Component {
  constructor (props) {
    super(props)
    this.back = this.back.bind(this)
  }
  back () {
    this.props.history.push('/tools')
  }
  state = {
    supplierName: '',
    label: '',
    url: ''
  }
  componentDidMount () {
    const id = this.props.location.pathname.split('/')[2]
    fetch({
      url: 'http://localhost:8080/retrieve/prop/queryDetail',
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
                  供应商名称：
                </Col>
                <Col span={19}>
                  {this.state.supplierName}
                </Col>
              </Row>
              <Row className={styles.disc}>
                <Col span={3}>
                  标签：
                </Col>
                <Col span={19}>
                  {this.state.label}
                </Col>
              </Row>
              <Row className={styles.disc}>
                <Col span={3}>
                  链接：
                </Col>
                <Col span={19}>
                  {
                     /^[\u4e00-\u9fa5]+$/.test(this.state.url[0])?this.state.url:<a href={this.state.url} target="_target">{this.state.url}</a>
                  }
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

export default withRouter(ToolsInfo)