import React from 'react'
import { Row, Col, Tag, Divider, Button, Pagination } from 'antd'
import styles from './css/actor.module.css'
import { Link } from 'react-router-dom'
import { fetch } from '../../../fetch/fetch'

const { CheckableTag } = Tag

const sexList = ['男', '女']

const ageRangeFromServer = ['0-3', '4-10', '11-16', '17-25', '26-35', '36-45', '46-60', '60-']

const nationalFromServer = ['中国', '日本', '美国', '俄国', '韩国']

const hobbyFromServer = ['舞蹈', '唱歌', '跑酷', '英语']

function serilizeAgeList (arr) {
  const year = new Date().getFullYear()
  const newArr = arr.map(val => {
    const tempArr = val.split('-')
    for (let i = 0; i < tempArr.length; i++) {
      tempArr[i] = year - Number(tempArr[i])
    }
    return {
      start: tempArr[1],
      end: tempArr[0]
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
    // 演员列表搜索结果
    actorList: [],
    pageNum: 1,
    pageSize: 1,
    total: 0
  }
  handleSexSelect (tag, checked) {
    const { sexTags } = this.state
    const nextSelectedTags = checked ? [...sexTags, tag] : sexTags.filter(t => t !== tag)
    this.setState({ sexTags: nextSelectedTags })
  }
  handlePageChange (val) {
    this.setState({
      pageNum: val
    })
    this.getActorList(val)
  }
  handleAgeSelect (tag, checked) {
    const { ageTags } = this.state
    const nextSelectedTags = checked ? [...ageTags, tag] : ageTags.filter(t => t !== tag)
    this.setState({ ageTags: nextSelectedTags })
  }

  handleNationalSelect (tag, checked) {
    const { nationalTags } = this.state
    const nextSelectedTags = checked ? [...nationalTags, tag] : nationalTags.filter(t => t !== tag)
    this.setState({ nationalTags: nextSelectedTags })
  }

  handleHobbySelect (tag, checked) {
    const { hobbyTags } = this.state
    const nextSelectedTags = checked ? [...hobbyTags, tag] : hobbyTags.filter(t => t !== tag)
    this.setState({ hobbyTags: nextSelectedTags })
  }

  getActorList (num) {
    this.setState({
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
    // console.log(this.state.hobbyTags===0?null:this.state.hobbyTags)
    fetch({
      url: '/mock/retrieve/actor/searchActor',
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
              {nationalFromServer.map(tag => (
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
              {hobbyFromServer.map(tag => (
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