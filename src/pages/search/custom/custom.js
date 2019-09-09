import React from 'react'
import { Row, Col, Tag, Divider, Button, Pagination } from 'antd'
import styles from './css/custom.module.css'
import { Link } from 'react-router-dom'
import { fetch } from '../../../fetch/fetch'
import { connect } from 'react-redux'
import * as ActionCreator from './store/actionCreator'

const { CheckableTag } = Tag

class Custom extends React.Component {
  constructor (props) {
    super(props)
    this.handlePropSelect = this.handlePropSelect.bind(this)
    this.handleTimeSelect = this.handleTimeSelect.bind(this)
    this.handleTypeSelect = this.handleTypeSelect.bind(this)
    this.handleCharacSelect = this.handleCharacSelect.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
  }
  state = {
    nameTags: [],
    sexTags: [],
    ageTags: [],
    typeTags: [],
    labelTags: [],
    channelTags: [],
    nameList: [],
    sexList: [],
    ageList: [],
    typeList: [],
    labelList: [],
    channelList: [],
    // 搜索结果
    scenesList: [],
    pageNum: 1,
    pageSize: 20,
    total: 0
  }
  async handlePropSelect (tag, checked) {
    const nextSelectedTags = checked ? [...this.props.nameTags, tag] : this.props.nameTags.filter(t => t !== tag)
    await this.props.setNameTags(nextSelectedTags)
    await this.props.setPageNum(1)
    this.getSecnesList()
  }
  
  async handleTimeSelect (tag, checked) {
    const nextSelectedTags = checked ? [...this.props.sexTags, tag] : this.props.sexTags.filter(t => t !== tag)
    await this.props.setSexTags(nextSelectedTags)
    await this.props.setPageNum(1)
    this.getSecnesList()
  }

  async handleTypeSelect (tag, checked) {
    const nextSelectedTags = checked ? [...this.props.ageTags, tag] : this.props.ageTags.filter(t => t !== tag)
    await this.props.setAgeTags(nextSelectedTags)
    await this.props.setPageNum(1)
    this.getSecnesList()
  }

  async handleCharacSelect (tag, checked) {
    const nextSelectedTags = checked ? [...this.props.typeTags, tag] : this.props.typeTags.filter(t => t !== tag)
    await this.props.setTypeTags(nextSelectedTags)
    await this.props.setPageNum(1)
    this.getSecnesList()
  }

  async handleLabelSelect (tag, checked) {
    const nextSelectedTags = checked ? [...this.props.labelTags, tag] : this.props.labelTags.filter(t => t !== tag)
    await this.props.setLabelTags(nextSelectedTags)
    await this.props.setPageNum(1)
    this.getSecnesList()
  }

  async handleChannelSelect (tag, checked) {
    const nextSelectedTags = checked ? [...this.props.channelTags, tag] : this.props.channelTags.filter(t => t !== tag)
    await this.props.setChannelTags(nextSelectedTags)
    await this.props.setPageNum(1)
    this.getSecnesList(1)
  }

  async handlePageChange (val) {
    await this.props.setPageNum(val)
    this.getSecnesList()
  }

  async getSecnesList () {
    let sex = ''
    if (this.props.sexTags.length === 2 || this.props.sexTags.length === 0) {
      sex = 2
    } else {
      if (this.props.sexTags[0] === '男') {
        sex = 1
      }
      if (this.props.sexTags[0] === '女') {
        sex = 0
      }
    }
    fetch({
      url: 'http://localhost:8080/retrieve/custom/searchCustom',
      method: 'post',
      data: JSON.stringify({
        nameList: this.props.nameTags.length?this.props.nameTags:null,
        sex: sex,
        ageList: this.props.ageTags.length?this.props.ageTags:null,
        typeList: this.props.typeTags.length?this.props.typeTags:null,
        labelList: this.props.labelTags.length?this.props.labelTags:null,
        channelList: this.props.channelList.length?this.props.channelList:null,
        pageNum: this.props.pageNum,
        pageSize: this.props.pageSize
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      this.props.setScenesList(res.data.data.list)
      this.props.setTotal(res.data.data.page.totalResult)
    })
  }

  componentDidMount () {
    fetch({
      method: 'post',
      url: 'http://localhost:8080/retrieve/custom/initData'
    }).then(res => {
      this.props.setNameList(res.data.data.name)
      this.props.setSexList(res.data.data.sex)
      this.props.setAgeList(res.data.data.age)
      this.props.setTypeList(res.data.data.type)
      this.props.setLabelList(res.data.data.label)
      this.props.setChannelList(res.data.data.channel)
    })
    this.getSecnesList()
  }

  render() {
    return (
      <div className={styles.secenes}>
        <div className={styles.category}>
          <Row className={styles.row}>
            <Col span={1}>
              性别：
            </Col>
            <Col span={20}>
              {this.props.sexList.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.props.sexTags.indexOf(tag) > -1}
                  onChange={checked => this.handleTimeSelect(tag, checked)}
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
              {this.props.ageList.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.props.ageTags.indexOf(tag) > -1}
                  onChange={checked => this.handleTypeSelect(tag, checked)}
                >
                  {tag}
                </CheckableTag>
              ))}
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col span={1}>
              类别：
            </Col>
            <Col span={20}>
              {this.props.typeList.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.props.typeTags.indexOf(tag) > -1}
                  onChange={checked => this.handleCharacSelect(tag, checked)}
                >
                  {tag}
                </CheckableTag>
              ))}
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col span={1}>
              类目：
            </Col>
            <Col span={20}>
              {this.props.labelList.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.props.labelTags.indexOf(tag) > -1}
                  onChange={checked => this.handleLabelSelect(tag, checked)}
                >
                  {tag}
                </CheckableTag>
              ))}
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col span={1}>
              渠道：
            </Col>
            <Col span={20}>
              {this.props.channelList.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.props.channelTags.indexOf(tag) > -1}
                  onChange={checked => this.handleChannelSelect(tag, checked)}
                >
                  {tag}
                </CheckableTag>
              ))}
            </Col>
          </Row>
          <Button type="primary" onClick={this.getSecnesList.bind(this, 1)} size="small">查询</Button>
        </div>
        <Divider />
        <div className="actorList">
          {this.props.scenesList.map(item => (
            <div key={item.customId} className={styles.scenesPic}>
              <Link className={styles.scenesPicContainer} to={{pathname: `custom/${item.customId}`, query: {imgUrl: item.imgPath}}}>
                <img className={styles.pic} src={item.imgPath} alt="" />
              </Link>
              <div style={{textAlign: 'center'}}>{item.name}</div>
            </div>
          ))}
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
    nameTags,
    sexTags,
    ageTags,
    typeTags,
    labelTags,
    channelTags,
    nameList,
    sexList,
    ageList,
    typeList,
    labelList,
    channelList,
    // 搜索结果
    scenesList,
    pageNum,
    pageSize,
    total
  } = state.customReducer
  return {
    nameTags,
    sexTags,
    ageTags,
    typeTags,
    labelTags,
    channelTags,
    nameList,
    sexList,
    ageList,
    typeList,
    labelList,
    channelList,
    scenesList,
    pageNum,
    pageSize,
    total
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNameTags (data) {
      dispatch(ActionCreator.setNameTags(data))
    },
    setSexTags (data) {
      dispatch(ActionCreator.setSexTags(data))
    },
    setAgeTags (data) {
      dispatch(ActionCreator.setAgeTags(data))
    },
    setTypeTags (data) {
      dispatch(ActionCreator.setTypeTags(data))
    },
    setLabelTags (data) {
      dispatch(ActionCreator.setLabelTags(data))
    },
    setChannelTags (data) {
      dispatch(ActionCreator.setChannelTags(data))
    },
    setNameList (data) {
      dispatch(ActionCreator.setNameList(data))
    },
    setSexList (data) {
      dispatch(ActionCreator.setSexList(data))
    },
    setAgeList (data) {
      dispatch(ActionCreator.setAgeList(data))
    },
    setTypeList (data) {
      dispatch(ActionCreator.setTypeList(data))
    },
    setLabelList (data) {
      dispatch(ActionCreator.setLabelList(data))
    },
    setChannelList (data) {
      dispatch(ActionCreator.setChannelList(data))
    },
    setScenesList (data) {
      dispatch(ActionCreator.setSceneList(data))
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

export default connect(mapStateToProps, mapDispatchToProps)(Custom)