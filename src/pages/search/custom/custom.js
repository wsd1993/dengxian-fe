import React from 'react'
import { Row, Col, Tag, Divider, Button, Pagination } from 'antd'
import styles from './css/custom.module.css'
import { Link } from 'react-router-dom'
import { fetch } from '../../../fetch/fetch'

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
    const { nameTags } = this.state
    const nextSelectedTags = checked ? [...nameTags, tag] : nameTags.filter(t => t !== tag)
    await this.setState({ nameTags: nextSelectedTags })
    this.getSecnesList(1)
  }
  
  async handleTimeSelect (tag, checked) {
    const { sexTags } = this.state
    const nextSelectedTags = checked ? [...sexTags, tag] : sexTags.filter(t => t !== tag)
    await this.setState({ sexTags: nextSelectedTags })
    this.getSecnesList(1)
  }

  async handleTypeSelect (tag, checked) {
    const { ageTags } = this.state
    const nextSelectedTags = checked ? [...ageTags, tag] : ageTags.filter(t => t !== tag)
    await this.setState({ ageTags: nextSelectedTags })
    this.getSecnesList(1)
  }

  async handleCharacSelect (tag, checked) {
    const { typeTags } = this.state
    const nextSelectedTags = checked ? [...typeTags, tag] : typeTags.filter(t => t !== tag)
    await this.setState({ typeTags: nextSelectedTags })
    this.getSecnesList(1)
  }

  async handleLabelSelect (tag, checked) {
    const { labelTags } = this.state
    const nextSelectedTags = checked ? [...labelTags, tag] : labelTags.filter(t => t !== tag)
    await this.setState({ labelTags: nextSelectedTags })
    this.getSecnesList(1)
  }

  async handleChannelSelect (tag, checked) {
    const { channelTags } = this.state
    const nextSelectedTags = checked ? [...channelTags, tag] : channelTags.filter(t => t !== tag)
    await this.setState({ channelTags: nextSelectedTags })
    this.getSecnesList(1)
  }

  async handlePageChange (val) {
    await this.setState({
      pageNum: val,
    })
    this.getSecnesList(val)
  }

  async getSecnesList (num) {
    await this.setState({
      pageNum: num
    })
    let sex = ''
    if (this.state.sexTags.length === 2 || this.state.sexTags.length === 0) {
      sex = 2
    } else {
      if (this.state.sexTags[0] === '男') {
        sex = 1
      }
      if (this.state.sexTags[0] === '女') {
        sex = 0
      }
    }
    fetch({
      url: 'http://localhost:8080/retrieve/custom/searchCustom',
      method: 'post',
      data: JSON.stringify({
        nameList: this.state.nameTags.length?this.state.nameTags:null,
        sex: sex,
        ageList: this.state.ageTags.length?this.state.ageTags:null,
        typeList: this.state.typeTags.length?this.state.typeTags:null,
        labelList: this.state.labelTags.length?this.state.labelTags:null,
        channelList: this.state.channelList.length?this.state.channelList:null,
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
      url: 'http://localhost:8080/retrieve/custom/initData'
    }).then(res => {
      this.setState({
        nameList: res.data.data.name,
        sexList: res.data.data.sex,
        ageList: res.data.data.age,
        typeList: res.data.data.type,
        labelList: res.data.data.label,
        channelList: res.data.data.channel
      })
    })
    this.getSecnesList(1)
  }

  render() {
    return (
      <div className={styles.secenes}>
        <div className={styles.category}>
          <Row className={styles.row}>
            <Col span={1}>
              名称：
            </Col>
            <Col span={20}>
              {this.state.nameList.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.state.nameTags.indexOf(tag) > -1}
                  onChange={checked => this.handlePropSelect(tag, checked)}
                >
                  {tag}
                </CheckableTag>
              ))}
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col span={1}>
              性别：
            </Col>
            <Col span={20}>
              {this.state.sexList.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.state.sexTags.indexOf(tag) > -1}
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
              {this.state.ageList.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.state.ageTags.indexOf(tag) > -1}
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
              {this.state.typeList.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.state.typeTags.indexOf(tag) > -1}
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
              {this.state.labelList.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.state.labelTags.indexOf(tag) > -1}
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
              {this.state.channelList.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.state.channelTags.indexOf(tag) > -1}
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
          {this.state.scenesList.map(item => (
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

export default Custom