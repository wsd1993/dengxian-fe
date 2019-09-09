import React from 'react'
import { Row, Col, Tag, Divider, Button, Pagination } from 'antd'
import styles from './css/scenes.module.css'
import { Link } from 'react-router-dom'
import { fetch } from '../../../fetch/fetch'
import { connect } from 'react-redux'
import * as ActionCreator from './store/actionCreator'

const { CheckableTag } = Tag

class Scenes extends React.Component {
  constructor (props) {
    super(props)
    this.handlePropSelect = this.handlePropSelect.bind(this)
    this.handleTimeSelect = this.handleTimeSelect.bind(this)
    this.handleTypeSelect = this.handleTypeSelect.bind(this)
    this.handleCharacSelect = this.handleCharacSelect.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
  }
  state = {
    propTags: [],
    timeTags: [],
    typeTags: [],
    characTags: [],
    propsList: [],
    timeList: [],
    typeList: [],
    characList: [],
    // 搜索结果
    scenesList: [],
    pageNum: 1,
    pageSize: 20,
    total: 0
  }
  async handlePropSelect (tag, checked) {
    const nextSelectedTags = checked ? [...this.props.propTags, tag] : this.props.propTags.filter(t => t !== tag)
    await this.props.setPropTags(nextSelectedTags)
    await this.props.setPageNum(1)
    this.getSecnesList()
  }
  
  async handleTimeSelect (tag, checked) {
    const nextSelectedTags = checked ? [...this.props.timeTags, tag] : this.props.timeTags.filter(t => t !== tag)
    await this.props.setTimeTags(nextSelectedTags)
    await this.props.setPageNum(1)
    this.getSecnesList()
  }

  async handleTypeSelect (tag, checked) {
    const nextSelectedTags = checked ? [...this.props.typeTags, tag] : this.props.typeTags.filter(t => t !== tag)
    await this.props.setTypeTags(nextSelectedTags)
    await this.props.setPageNum(1)
    this.getSecnesList()
  }

  async handleCharacSelect (tag, checked) {
    const nextSelectedTags = checked ? [...this.props.characTags, tag] : this.props.characTags.filter(t => t !== tag)
    await this.props.setCharacTags(nextSelectedTags)
    await this.props.setPageNum(1)
    this.getSecnesList()
  }

  async handlePageChange (val) {
    await this.props.setPageNum(val)
    await this.props.setPageNum(val)
    this.getSecnesList()
  }

  async getSecnesList () {
    // console.log(this.state.propTags)
    fetch({
      url: 'http://localhost:8080/retrieve/area/searchArea',
      method: 'post',
      data: JSON.stringify({
        natureList: this.props.propTags.length?this.props.propTags:null,
        yearsList: this.props.timeTags.length?this.props.timeTags:null,
        typeList: this.props.typeTags.length?this.props.typeTags:null,
        featureList: this.props.characTags.length?this.props.characTags:null,
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
      url: 'http://localhost:8080/retrieve/area/initData'
    }).then(res => {
      this.props.setPropsList(res.data.data.nature)
      this.props.setTimeList(res.data.data.years)
      this.props.setCharacList(res.data.data.feature)
      this.props.setTypeList(res.data.data.type)
    })
    this.getSecnesList()
  }

  render() {
    return (
      <div className={styles.secenes}>
        <div className={styles.category}>
          <Row className={styles.row}>
            <Col span={1}>
              性质：
            </Col>
            <Col span={20}>
              {this.props.propsList.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.props.propTags.indexOf(tag) > -1}
                  onChange={checked => this.handlePropSelect(tag, checked)}
                >
                  {tag}
                </CheckableTag>
              ))}
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col span={1}>
              年代：
            </Col>
            <Col span={20}>
              {this.props.timeList.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.props.timeTags.indexOf(tag) > -1}
                  onChange={checked => this.handleTimeSelect(tag, checked)}
                >
                  {tag}
                </CheckableTag>
              ))}
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col span={1}>
              类型：
            </Col>
            <Col span={20}>
              {this.props.typeList.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.props.typeTags.indexOf(tag) > -1}
                  onChange={checked => this.handleTypeSelect(tag, checked)}
                >
                  {tag}
                </CheckableTag>
              ))}
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col span={1}>
              特点：
            </Col>
            <Col span={20}>
              {this.props.characList.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.props.characTags.indexOf(tag) > -1}
                  onChange={checked => this.handleCharacSelect(tag, checked)}
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
            <div key={item.id} className={styles.scenesPic}>
              <Link className={styles.scenesPicContainer} to={{pathname: `scenes/${item.id}`, query: {imgUrl: item.imgPath}}}>
                <img className={styles.pic} src={item.imgPath} alt="" />
              </Link>
              <div style={{textAlign: 'center'}}>名称：{item.name}  ({item.nature})</div>
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
    propTags,
    timeTags,
    typeTags,
    characTags,
    propsList,
    timeList,
    typeList,
    characList,
    // 搜索结果
    scenesList,
    pageNum,
    pageSize,
    total
  } = state.scenesReducer
  return {
    propTags,
    timeTags,
    typeTags,
    characTags,
    propsList,
    timeList,
    typeList,
    characList,
    // 搜索结果
    scenesList,
    pageNum,
    pageSize,
    total
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPropTags (data) {
      dispatch(ActionCreator.setPropTags(data))
    },
    setTimeTags (data) {
      dispatch(ActionCreator.setTimeTags(data))
    },
    setTypeTags (data) {
      dispatch(ActionCreator.setTypeTags(data))
    },
    setCharacTags (data) {
      dispatch(ActionCreator.setCharacTags(data))
    },
    setPropsList (data) {
      dispatch(ActionCreator.setPropsList(data))
    },
    setTimeList (data) {
      dispatch(ActionCreator.setTimeList(data))
    },
    setTypeList (data) {
      dispatch(ActionCreator.setTypeList(data))
    },
    setCharacList (data) {
      dispatch(ActionCreator.setCharacList(data))
    },
    setScenesList (data) {
      dispatch(ActionCreator.setScenesList(data))
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

export default connect(mapStateToProps, mapDispatchToProps)(Scenes)