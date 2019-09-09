import React from 'react'
import { Row, Col, Tag, Divider, Button, Pagination } from 'antd'
import styles from './css/tools.module.css'
import { fetch } from '../../../fetch/fetch'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as ActionCreator from './store/actionCreator'

const { CheckableTag } = Tag

class Scenes extends React.Component {
  constructor (props) {
    super(props)
    this.handleLabelSelect = this.handleLabelSelect.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
  }
  state = {
    labelList: [],
    labelTags: [],
    // 搜索结果
    pageNum: 1,
    pageSize: 20,
    total: 0,
    toolsList: []
  }
  async handleLabelSelect (tag, checked) {
    const nextSelectedTags = checked ? [...this.props.labelTags, tag] : this.props.labelTags.filter(t => t !== tag)
    await this.props.setLabelTags(nextSelectedTags)
    await this.props.setPageNum(1)
    this.getToolsList()
  }
  jump (id) {
    fetch({
      method: 'post',
      url: 'http://localhost:8080/retrieve/prop/queryDetail',
      data: JSON.stringify({
        id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      window.open(res.data.data.url)
    })
  }
  
  async handlePageChange (val) {
    await this.props.setPageNum(val)
    this.getToolsList()
  }

  async getToolsList () {
    fetch({
      url: 'http://localhost:8080/retrieve/prop/searchProp',
      method: 'post',
      data: JSON.stringify({
        labelList: this.props.labelTags.length?this.props.labelTags:null,
        pageNum: this.props.pageNum,
        pageSize: this.props.pageSize,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      this.props.setToolsList(res.data.data.list)
      this.props.setTotal(res.data.data.page.totalResult)
    })
  }

  componentDidMount () {
    fetch({
      method: 'post',
      url: 'http://localhost:8080/retrieve/prop/initData'
    }).then(res => {
      this.props.setLabelList(res.data.data.label)
    })
    this.getToolsList()
  }

  render() {
    return (
      <div className={styles.secenes}>
        <div className={styles.category}>
          <Row className={styles.row}>
            <Col span={1}>
              标签：
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
          <Button type="primary" onClick={this.getToolsList.bind(this, 1)} size="small">查询</Button>
        </div>
        <Divider />
        <div className="actorList">
          {this.props.toolsList.map(item => (
            <div key={item.id} className={styles.toolsPic}>
              <Link className={styles.scenesPicContainer} to={{pathname: `tools/${item.id}`, query: {imgUrl: item.imgPath}}}>
                <img className={styles.pic} src={item.imgPath} alt="" />
              </Link>
              <div className={styles.name}>
                {item.supplierName}
              </div>
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
    labelList,
    labelTags,
    // 搜索结果
    pageNum,
    pageSize,
    total,
    toolsList
  } = state.toolsReducer
  return {
    labelList,
    labelTags,
    // 搜索结果
    pageNum,
    pageSize,
    total,
    toolsList
  }
}

const mapDistpatchToProps = (dispatch) => {
  return {
    setLabelList (data) {
      dispatch(ActionCreator.setLabelList(data))
    },
    setLabelTags (data) {
      dispatch(ActionCreator.setLabelTags(data))
    },
    setPageNum (data) {
      dispatch(ActionCreator.setPageNum(data))
    },
    setPageSize (data) {
      dispatch(ActionCreator.setPageSize(data))
    },
    setTotal (data) {
      dispatch(ActionCreator.setTotal(data))
    },
    setToolsList (data) {
      dispatch(ActionCreator.setToolsList(data))
    }
  }
}

export default connect(mapStateToProps, mapDistpatchToProps)(Scenes)