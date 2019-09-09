import React from 'react'
import { Row, Col, Tag, Divider, Button, Pagination } from 'antd'
import styles from './css/actor.module.css'
import { Link } from 'react-router-dom'
import { fetch } from '../../../fetch/fetch'
import { connect } from 'react-redux'
import * as ActionCreator from './store/actionCreator'

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
      this.props.setHobbyList(res.data.data.hobby)
      this.props.setCountryList(res.data.data.country)
    })
    this.getActorList(1)
  }

  async handleSexSelect (tag, checked) {
    // const { sexTags } = this.state
    const nextSelectedTags = checked ? [...this.props.sexTags, tag] : this.props.sexTags.filter(t => t !== tag)
    // await this.setState({ sexTags: nextSelectedTags })
    await this.props.setSexTags(nextSelectedTags)
    this.getActorList(1)
  }
  async handlePageChange (val) {
    await this.props.setPageNum(val)
    this.getActorList()
  }
  async handleAgeSelect (tag, checked) {
    const nextSelectedTags = checked ? [...this.props.ageTags, tag] : this.props.ageTags.filter(t => t !== tag)
    await this.props.setAgeTags(nextSelectedTags)
    this.getActorList()
  }

  async handleNationalSelect (tag, checked) {
    const nextSelectedTags = checked ? [...this.props.nationalTags, tag] : this.props.nationalTags.filter(t => t !== tag)
    // await this.setState({ nationalTags: nextSelectedTags })
    await this.props.setNationalTags(nextSelectedTags)
    this.getActorList(1)
  }

  async handleHobbySelect (tag, checked) {
    const nextSelectedTags = checked ? [...this.props.hobbyTags, tag] : this.props.hobbyTags.filter(t => t !== tag)
    await this.props.setHobbyTags(nextSelectedTags)
    this.getActorList()
  }

  async getActorList () {
    const newAgeList = serilizeAgeList(this.props.ageTags)
    let sex
    if (this.props.sexTags.length === 2) {
      sex = 2
    } else if (this.props.sexTags.length === 1) {
      if (this.props.sexTags[0] === '男') {
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
        countryList: this.props.nationalTags.length===0?null:this.props.nationalTags,
        hobbyList: this.props.hobbyTags.length===0?null:this.props.hobbyTags,
        pageNum: this.props.pageNum,
        pageSize: this.props.pageSize
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      // this.setState({
      //   actorList: res.data.data.list,
      //   total: res.data.data.page.totalResult,
      //   pageNum: this.state.pageNum
      // })
      this.props.setActorList(res.data.data.list)
      this.props.setTotal(res.data.data.page.totalResult)
      this.props.setPageNum(this.props.pageNum)
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
                  checked={this.props.sexTags.indexOf(tag) > -1}
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
                  checked={this.props.ageTags.indexOf(tag) > -1}
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
              {this.props.countryList.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.props.nationalTags.indexOf(tag) > -1}
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
              {this.props.hobbyList.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.props.hobbyTags.indexOf(tag) > -1}
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
            this.props.actorList.length?
            this.props.actorList.map(item => (
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
            current={this.props.pageNum}
            pageSize={this.props.pageSize}
            showTotal={total => `共 ${total} 条结果`}
            defaultCurrent={1}
            total={this.props.total}
            onChange={this.handlePageChange} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    sexTags,
    ageTags,
    nationalTags,
    hobbyTags,
    hobbyList,
    countryList,
    actorList,
    pageNum,
    pageSize,
    total
  } = state.actorReducer
  return {
    sexTags,
    ageTags,
    nationalTags,
    hobbyTags,
    hobbyList,
    countryList,
    actorList,
    pageNum,
    pageSize,
    total
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSexTags (data) {
      dispatch(ActionCreator.setActorSexTags(data))
    },
    setAgeTags (data) {
      dispatch(ActionCreator.setActorAgeTags(data))
    },
    setNationalTags (data) {
      dispatch(ActionCreator.setNationalTags(data))
    },
    setHobbyTags (data) {
      dispatch(ActionCreator.setHobbyTags(data))
    },
    setHobbyList (data) {
      dispatch(ActionCreator.setHobbyList(data))
    },
    setCountryList (data) {
      dispatch(ActionCreator.setCountryList(data))
    },
    setActorList (data) {
      dispatch(ActionCreator.setActorList(data))
    },
    setPageNum (data) {
      dispatch(ActionCreator.setPageNum(data))
    },
    setPageSize (data) {
      dispatch(ActionCreator.setPageSize(data))
    },
    setTotal (data) {
      dispatch(ActionCreator.setTotal(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Actors)