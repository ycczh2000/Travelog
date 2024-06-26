// 这里用于存放网页项目中用到的选项
//editing组件引用的cityData不知道为什么从这导入会报错，所以更改locations时请同时更改components/editing/cityData.ts
//editing页使用的下拉单选组件组件,并不依赖这里的数值提供，所有更改tripXXs时请同时更改components/editing/editing.js下的对应Radio
export const locations = [
    {
      label: '浙江',
      value: '浙江',
      children: [
        {
          label: '杭州',
          value: '杭州',
          children: [
            {
              label: '西湖区',
              value: '西湖区',
            },
            {
              label: '上城区',
              value: '上城区',
            },
            {
              label: '余杭区',
              value: '余杭区',
              disabled: true,
            },
          ],
        },
        {
          label: '温州',
          value: '温州',
          children: [
            {
              label: '鹿城区',
              value: '鹿城区',
            },
            {
              label: '龙湾区',
              value: '龙湾区',
              disabled: true,
            },
            {
              label: '瓯海区',
              value: '瓯海区',
            },
          ],
        },
        {
          label: '宁波',
          value: '宁波',
          children: [
            {
              label: '海曙区',
              value: '海曙区',
            },
            {
              label: '江北区',
              value: '江北区',
            },
            {
              label: '镇海区',
              value: '镇海区',
            },
          ],
        },
      ],
    },
    {
      label: '安徽',
      value: '安徽',
      children: [
        {
          label: '合肥',
          value: '合肥',
          children: [
            {
              label: '包河区',
              value: '包河区',
            },
            {
              label: '蜀山区',
              value: '蜀山区',
            },
            {
              label: '瑶海区',
              value: '瑶海区',
            },
          ],
        },
        {
          label: '芜湖',
          value: '芜湖',
          children: [
            {
              label: '镜湖区',
              value: '镜湖区',
            },
            {
              label: '弋江区',
              value: '弋江区',
            },
            {
              label: '湾沚区',
              value: '湾沚区',
            },
          ],
        },
      ],
    },
    {
      label: '江苏',
      value: '江苏',
      children: [
        {
          label: '南京',
          value: '南京',
          children: [
            {
              label: '玄武区',
              value: '玄武区',
            },
            {
              label: '秦淮区',
              value: '秦淮区',
            },
            {
              label: '建邺区',
              value: '建邺区',
            },
          ],
        },
        {
          label: '苏州',
          value: '苏州',
          children: [
            {
              label: '虎丘区',
              value: '虎丘区',
            },
            {
              label: '吴中区',
              value: '吴中区',
            },
            {
              label: '相城区',
              value: '相城区',
            },
          ],
        },
      ],
    },
  ]
  export const travelogSorters = [
    {
      label: '推荐排序',
      value: '0',
    },
    {
      label: '评分升序',
      value: '1',
    },
    {
        label: '评分降序',
        value: '2',
    },
  ]

  export const tripWays = [
    {
        label:'骑行游',
        value:'骑行游',
    },
    {
      label: '自驾游',
      value: '自驾游',
    },
    {
      label: '火车/飞机游',
      value: '火车/飞机游',
    },
    {
      label: '大巴游',
      value: '大巴游',
    },
    {
        label: '组团游',
        value: '组团游',
      },
    {
        label: '邮轮游',
        value: '邮轮游',
    }
  ]
  export const tripNums = [
    {
      label: '亲子游',
      value: '亲子游',
    },
    {
      label: '情侣游',
      value: '情侣游',
    },
    {
      label: '全家游',
      value: '全家游',
    },
    {
      label: '单人游',
      value: '单人游',
    },
    {
      label: '2-5人',
      value: '2-5人',
    },
    {
      label: '5人以上',
      value: '5人以上',
    },
  ]
  export const tripDates = [
    {
      label: '小时游',
      value: '小时游',
    },
    {
      label: '半日游',
      value: '半日游',
    },
    {
      label: '单日游',
      value: '单日游',
    },
    {
        label: '2-3日游',
        value: '2-3日游',
      },
      {
        label: '3-7天游',
        value: '3-7天游',
      },
      {
        label: '7天以上游',
        value: '7天以上游',
      },
  ]
  export const tripBudgets = [
    {
      label: '100元以下',
      value: '100元以下',
    },
    {
      label: '100-500元',
      value: '100-500元',
    },
    {
      label: '500-1000元',
      value: '500-1000元',
    },
    {
        label: '1000-3000元',
        value: '1000-3000元',
      },
      {
        label: '3000-10000元',
        value: '3000-10000元',
      },
      {
        label: '10000元以上',
        value: '10000元以上',
      },
  ]
  export const fieldNamesOptions = [
    {
      labelT: '选项一',
      valueT: '1',
    },
    {
      labelT: '选项二',
      valueT: '2',
    },
    {
      labelT: '选项三',
      valueT: '3',
      disabledT: true,
    },
  ]