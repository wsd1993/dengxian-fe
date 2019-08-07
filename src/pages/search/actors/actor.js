import React from 'react'
import { Row, Col, Tag, Divider, Button, Pagination } from 'antd'
import styles from './css/actor.module.css'
import { Link } from 'react-router-dom'
import { fetch } from '../../../fetch/fetch'

const { CheckableTag } = Tag

const sexList = ['男', '女']

const ageRangeFromServer = ['0-3', '4-10', '11-16', '17-25', '26-35', '36-45', '46-60', '60-']

function serilizeAgeList (arr) {
  const year = new Date().getFullYear()
  const newArr = arr.map(val => {
    const tempArr = val.split('-')
    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i] === '') {
        tempArr[i] = 0
      } else {
        tempArr[i] = year - Number(tempArr[i])
      }
    }
    return {
      startTime: tempArr[1],
      endTime: tempArr[0]
    }
  })
  return newArr
}

class Actors extends React.Component {
  constructor (props) {
    super(props)
    this.handleSexSelect = this.handleSexSelect.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleNationalSelect = this.handleNationalSelect.bind(this)
    this.handleHobbySelect = this.handleHobbySelect.bind(this)
  }
  state = {
    sexTags: [],
    ageTags: [],
    nationalTags: [],
    hobbyTags: [],
    hobbyList: [],
    countryList: [],
    // 演员列表搜索结果
    actorList: [],
    pageNum: 1,
    pageSize: 20,
    total: 0
  }

  componentDidMount () {
    fetch({
      url: 'http://localhost:8080/retrieve/actor/initData',
      method: 'post',
    }).then(res => {
      this.setState({
        hobbyList: res.data.data.hobby,
        countryList: res.data.data.country
      })
    })
    this.getActorList(1)
  }

  async handleSexSelect (tag, checked) {
    const { sexTags } = this.state
    const nextSelectedTags = checked ? [...sexTags, tag] : sexTags.filter(t => t !== tag)
    await this.setState({ sexTags: nextSelectedTags })
    this.getActorList(1)
  }
  async handlePageChange (val) {
    await this.setState({
      pageNum: val
    })
    this.getActorList(val)
  }
  async handleAgeSelect (tag, checked) {
    const { ageTags } = this.state
    const nextSelectedTags = checked ? [...ageTags, tag] : ageTags.filter(t => t !== tag)
    await this.setState({ ageTags: nextSelectedTags })
    this.getActorList(1)
  }

  async handleNationalSelect (tag, checked) {
    const { nationalTags } = this.state
    const nextSelectedTags = checked ? [...nationalTags, tag] : nationalTags.filter(t => t !== tag)
    await this.setState({ nationalTags: nextSelectedTags })
    this.getActorList(1)
  }

  async handleHobbySelect (tag, checked) {
    const { hobbyTags } = this.state
    const nextSelectedTags = checked ? [...hobbyTags, tag] : hobbyTags.filter(t => t !== tag)
    await this.setState({ hobbyTags: nextSelectedTags })
    this.getActorList(1)
  }

  async getActorList (num) {
    await this.setState({
      pageNum: num
    })
    const newAgeList = serilizeAgeList(this.state.ageTags)
    let sex
    if (this.state.sexTags.length === 2) {
      sex = 2
    } else if (this.state.sexTags.length === 1) {
      if (this.state.sexTags[0] === '男') {
        sex = 1
      } else {
        sex = 0
      }
    } else {
      sex = null
    }
    fetch({
      url: 'http://localhost:8080/retrieve/actor/searchActor',
      method: 'post',
      data: JSON.stringify({
        sex,
        ageList: newAgeList.length===0?null:newAgeList,
        countryList: this.state.nationalTags.length===0?null:this.state.nationalTags,
        hobbyList: this.state.hobbyTags.length===0?null:this.state.hobbyTags,
        pageNum: num,
        pageSize: this.state.pageSize
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      this.setState({
        actorList: res.data.data.list,
        total: res.data.data.page.totalResult,
        pageNum: this.state.pageNum
      })
    })
  }

  render() {
    return (
      <div className={styles.actor}>
        <div className={styles.category}>
          <Row className={styles.row}>
            <Col span={1}>
              性别：
            </Col>
            <Col span={6}>
              {sexList.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.state.sexTags.indexOf(tag) > -1}
                  onChange={checked => this.handleSexSelect(tag, checked)}
                >
                  {tag}
                </CheckableTag>
              ))}
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col span={1}>
              年龄：
            </Col>
            <Col span={20}>
              {ageRangeFromServer.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.state.ageTags.indexOf(tag) > -1}
                  onChange={checked => this.handleAgeSelect(tag, checked)}
                >
                  {tag}
                </CheckableTag>
              ))}
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col span={1}>
              国籍：
            </Col>
            <Col span={20}>
              {this.state.countryList.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.state.nationalTags.indexOf(tag) > -1}
                  onChange={checked => this.handleNationalSelect(tag, checked)}
                >
                  {tag}
                </CheckableTag>
              ))}
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col span={1}>
              特长：
            </Col>
            <Col span={20}>
              {this.state.hobbyList.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.state.hobbyTags.indexOf(tag) > -1}
                  onChange={checked => this.handleHobbySelect(tag, checked)}
                >
                  {tag}
                </CheckableTag>
              ))}
            </Col>
          </Row>
          <Button type="primary" onClick={this.getActorList.bind(this, 1)} size="small">查询</Button>
        </div>
        <Divider />
        <div className="actorList">
          {
            // console.log(this.state)
            this.state.actorList.length?
            this.state.actorList.map(item => (
              <div key={item.id} className={styles.actorPic}>
                <Link className={styles.actorContainer} to={{pathname: `/actors/${item.id}`, query: {imgUrl: item.imgPath}}}>
                  <img className={styles.pic} src={item.imgPath} alt="" />
                </Link>
              </div>
            )):
            <div className={styles.noData}>
              暂无数据
            </div>
          }
        </div>
        <div className={styles.block}>
          <Pagination
            showQuickJumper
            current={this.state.pageNum}
            pageSize={this.state.pageSize}
            showTotal={total => `共 ${total} 条结果`}
            defaultCurrent={1}
            total={this.state.total}
            onChange={this.handlePageChange} />
        </div>
      </div>
    )
  }
}

export default Actors