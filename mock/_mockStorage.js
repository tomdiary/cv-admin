import lodash from 'lodash'
import Mock from 'mockjs'

const { Random } = Mock
const province = '京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新'

/**
 * 客户信息数据源
 * @returns [{id: number, name: string}]
 */
export const clientInfoSource = [
  {
    id: 1,
    name: '北京懵逼果集团汽车有限公司'
  },
  {
    id: 2,
    name: '安徽特斯拉集团汽车销售有限公司'
  },
  {
    id: 3,
    name: '北京运不运集团有限公司'
  },
  {
    id: 4,
    name: '香港特斯拉汽车集团有限公司'
  },
  {
    id: 5,
    name: '上海特斯拉集团股份有限公司'
  },
  {
    id: 6,
    name: '北京爱迪生汽车（集团）有限公司'
  },
  {
    id: 7,
    name: '上海特斯拉新能源有限公司'
  },
  {
    id: 8,
    name: '北京电灯泡智能汽车有限公司'
  }
]

/**
 * 电子围栏数据源
 */
export const fenceDataSource = [
  {
    id: 1,
    name: '北京大学（主校区）',
    data: []
  },
  {
    id: 2,
    name: '清华大学',
    data: []
  },
  {
    id: 3,
    name: '北京二环',
    data: []
  },
  {
    id: 4,
    name: '北京中关村软件园',
    data: []
  },
  {
    id: 5,
    name: '大同市区',
    data: []
  },
  {
    id: 6,
    name: '南京大学（主校区）',
    data: []
  }
]

/**
 * 车辆信息
 * @param {*} total 总条数
 * @returns [{}]
 */
export const vehicleInfoFun = (total = 200) => {
  const arr = []
  const clientInfo = lodash.cloneDeep(clientInfoSource)
  for (let i = 0; i < total; i++) {
    arr.push({
      id: i + 1,
      vin: `XMS${Random.string('number', 16)}`,
      carNum: `${Random.cword(province)}${Random.character('upper')}·${Random.string('number', 5)}`,
      terminal: /\d{6,6}/,
      status: Random.natural(0, 1),
      carType: Random.natural(0, 1),
      address: Random.county(true),
      createTime: Random.datetime(),
      mileage: Random.integer(40, 120),
      orderNumber: 1928424,
      customerName: clientInfo[Math.floor(Math.random() * (clientInfo.length - 1))].name
    })
  }

  return arr
}

/**
 * 电子围栏列表
 * @param {*} total 总条数
 * @returns [{}]
 */
export const electricFenceListFun = (total = 200) => {
  const arr = []
  const fenceData = lodash.cloneDeep(fenceDataSource)
  for (let i = 0; i < total; i++) {
    arr.push({
      id: i + 1,
      numbering: `EFR${Random.string('number', 20)}`, // 编号
      terminal: /\d{6,6}/, // 终端号
      status: Random.natural(0, 1), // 状态
      carType: Random.natural(0, 1), // 车辆状态
      createTime: Random.datetime(), // 创建时间
      mileage: Random.integer(40, 120), // 里程
      orderNumber: Random.natural(16), // 订单号
      fenceData: fenceData[Math.floor(Math.random() * (fenceData.length - 1))]
    })
  }

  return arr
}
