import React from 'react'
import { Row, Col, Tag, Divider, Button, Pagination } from 'antd'
import styles from './css/tools.module.css'
import { fetch } from '../../../fetch/fetch'

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
    lableList: [],
    pageNum: 1,
    pageSize: 20,
    total: 0,
    toolsList: []
  }
  handleLabelSelect (tag, checked) {
    const { labelTags } = this.state
    const nextSelectedTags = checked ? [...labelTags, tag] : labelTags.filter(t => t !== tag)
    this.setState({ labelTags: nextSelectedTags })
  }
  jump (id) {
    fetch({
      method: 'post',
      url: '/mock/retrieve/prop/queryDetail',
      data: JSON.stringify({
        id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      console.log(res)
      window.open(res.data.data.url)
    })
  }
  
  handlePageChange (val) {
    this.setState({
      pageNum: val,
    })
    this.getToolsList(val)
  }

  getToolsList (num) {
    this.setState({
      pageNum: num
    })
    fetch({
      url: '/mock/retrieve/prop/searchProp',
      method: 'post',
      data: JSON.stringify({
        labelList: this.state.labelTags.length?this.state.labelTags:null,
        pageNum: num,
        pageSize: this.state.pageSize,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      this.setState({
        toolsList: res.data.data.list,
        total: res.data.data.page.totalResult
      })
    })
  }

  componentDidMount () {
    fetch({
      method: 'post',
      url: '/mock/retrieve/prop/initData'
    }).then(res => {
      // console.log(res)
      this.setState({
        labelList: res.data.data.label,
      })
    })
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
          <Button type="primary" onClick={this.getToolsList.bind(this, 1)} size="small">查询</Button>
        </div>
        <Divider />
        <div className="actorList">
          {this.state.toolsList.map(item => (
            <div key={item.id} className={styles.toolsPic}>
              <img onClick={this.jump.bind(this, item.id)} className={styles.pic} src={item.imgPath} alt="" />
              <div className={styles.name}>
                {item.supplierName}
              </div>
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