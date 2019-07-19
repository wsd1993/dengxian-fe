import React from 'react'
import { Row, Col, Tag, Divider, Button, Pagination } from 'antd'
import styles from './css/scenes.module.css'
import { Link } from 'react-router-dom'
import { fetch } from '../../../fetch/fetch'

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
    propsTags: [],
    timeList: [],
    typeList: [],
    characList: [],
    // 搜索结果
    scenesList: [],
    pageNum: 1,
    pageSize: 20,
    total: 0
  }
  handlePropSelect (tag, checked) {
    const { propTags } = this.state
    const nextSelectedTags = checked ? [...propTags, tag] : propTags.filter(t => t !== tag)
    this.setState({ propTags: nextSelectedTags })
  }
  
  handleTimeSelect (tag, checked) {
    const { timeTags } = this.state
    const nextSelectedTags = checked ? [...timeTags, tag] : timeTags.filter(t => t !== tag)
    this.setState({ timeTags: nextSelectedTags })
  }

  handleTypeSelect (tag, checked) {
    const { typeTags } = this.state
    const nextSelectedTags = checked ? [...typeTags, tag] : typeTags.filter(t => t !== tag)
    this.setState({ typeTags: nextSelectedTags })
  }

  handleCharacSelect (tag, checked) {
    const { characTags } = this.state
    const nextSelectedTags = checked ? [...characTags, tag] : characTags.filter(t => t !== tag)
    this.setState({ characTags: nextSelectedTags })
  }

  handlePageChange (val) {
    this.setState({
      pageNum: val,
    })
    this.getSecnesList(val)
  }

  getSecnesList (num) {
    this.setState({
      pageNum: num
    })
    fetch({
      url: '/api/retrieve/area/searchArea',
      method: 'post',
      data: JSON.stringify({
        natureList: this.state.propsTags.length?this.state.propsTags:null,
        yearsList: this.state.timeTags.length?this.state.timeTags:null,
        typeList: this.state.typeTags.length?this.state.typeTags:null,
        featureList: this.state.characTags.length?this.state.characTags:null,
        pageNum: num,
        pageSize: this.state.pageSize
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      this.setState({
        scenesList: res.data.data.list,
        total: res.data.data.page.totalResult
      })
    })
  }

  componentDidMount () {
    fetch({
      method: 'post',
      url: '/api/retrieve/area/initData'
    }).then(res => {
      console.log(res)
      this.setState({
        propsList: res.data.data.nature,
        timeList: res.data.data.years,
        characList: res.data.data.feature,
        typeList: res.data.data.type
      })
    })
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
              {this.state.propsList.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.state.propTags.indexOf(tag) > -1}
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
              {this.state.timeList.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.state.timeTags.indexOf(tag) > -1}
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
              {this.state.typeList.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.state.typeTags.indexOf(tag) > -1}
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
              {this.state.characList.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.state.characTags.indexOf(tag) > -1}
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
          {this.state.scenesList.map(item => (
            <div key={item.id} className={styles.scenesPic}>
            <Link className={styles.scenesPicContainer} to={{pathname: `scenes/${item.id}`, query: {imgUrl: item.imgPath}}}>
              <img className={styles.pic} src={item.imgPath} alt="" />
            </Link>
          </div>
          ))}
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

export default Scenes