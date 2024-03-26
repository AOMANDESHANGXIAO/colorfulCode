export default [
  {
    title: '变量',
    contentList: [
      { title: '模板语法:', code: '变量名 = 变量值' },
      { title: '定义浮点变量', code: 'n = 100.0' },
      { title: '定义整型变量', code: 'n = 100' },
      { title: '定义字符串变量', code: 's = "hello world"' },
      { title: '定义布尔变量', code: 'b = True' }
    ]
  },
  {
    title: '输出',
    contentList: [
      { title: '模板语法:', code: 'print(要输出的内容，数据或变量)' },
      { title: '输出字符串数据', code: 'print("hello world")' },
      { title: '输出浮点数据', code: 'print(100.0)' },
      { title: '输出整型数据', code: 'print(100)' },
      { title: '输出变量', code: 's = "Hello"\nprint(s)' }
    ]
  },
  {
    title: '输入',
    contentList: [
      { title: '模板语法:', code: '变量名 = input()' },
      { title: '带提示词的输入', code: '变量名 = input("请输入内容")' },
      { title: '输入时变量类型转换:转为整形', code: '变量名 = int(input())' },
      { title: '输入时变量类型转换:转为浮点数', code: '变量名 = float(input())' }
    ]
  },
  {
    title: '条件判断',
    contentList: [
      { title: 'if条件判断', code: 'if 条件满足:\n    执行语句1' },
      { title: 'else条件判断', code: 'if 条件满足:\n    执行语句1\nelse:\n    执行语句2' },
      { title: 'elif条件判断', code: 'elif 条件满足2:\n    执行语句3\n' },
      {
        title: '综合使用',
        code: 'if 条件1满足:\n    执行语句1\nelif 条件2满足:\n    执行语句2\nelse:\n    执行语句3'
      },
      {
        title: '大于判断',
        code: 'if 变量 > 数值:\n    执行语句1\nelse:\n    执行语句2'
      },
      {
        title: '小于判断',
        code: 'if 变量 < 数值:\n    执行语句1\nelse:\n    执行语句2'
      },
      {
        title: '等于判断',
        code: 'if 变量 == 数值:\n    执行语句1\nelse:\n    执行语句2'
      },
      {
        title: '不等于判断',
        code: 'if 变量 != 数值:\n    执行语句1\nelse:\n    执行语句2'
      },
      {
        title: '大于等于判断',
        code: 'if 变量 >= 数值:\n    执行语句1\nelse:\n    执行语句2'
      },
      {
        title: '小于等于判断',
        code: 'if 变量 <= 数值:\n    执行语句1\nelse:\n    执行语句2'
      },
      {
        title: '逻辑与判断',
        code: 'if 条件1满足 and 条件2满足:\n    执行语句1\nelse:\n    执行语句2'
      },
      {
        title: '逻辑或判断',
        code: 'if 条件1满足 or 条件2满足:\n    执行语句1\nelse:\n    执行语句2'
      },
      {
        title: '逻辑非判断',
        code: 'if not 条件:\n    执行语句1\nelse:\n    执行语句2'
      }
    ]
  },
  {
    title: '运算',
    contentList: [
      {
        title: '加法运算',
        code: '变量名 = 变量名1 + 变量名2'
      },
      {
        title: '减法运算',
        code: '变量名 = 变量名1 - 变量名2'
      },
      {
        title: '乘法运算',
        code: '变量名 = 变量名1 * 变量名2'
      },
      {
        title: '除法运算',
        code: '变量名 = 变量名1 / 变量名2'
      },
      {
        title: '取模运算',
        code: '变量名 = 变量名1 % 变量名2'
      },
      {
        title: '幂运算',
        code: '变量名 = 变量名1 ** 变量名2'
      },
      {
        title: '取绝对值',
        code: '变量名 = abs(变量名)'
      }
    ]
  },
  {
    title: '列表',
    contentList: [
      { title: '创建空列表', code: '列表名 = []' },
      { title: '创建列表并赋值', code: '列表名 = [元素1,元素2,元素3]' },
      { title: '列表元素访问', code: '列表名[索引]' },
      { title: '列表元素修改', code: '列表名[索引] = 新的数据/变量' },
      { title: '列表元素删除', code: '列表名.pop(索引)' },
      { title: '列表元素添加', code: '列表名.append(元素)' },
      { title: '列表元素插入', code: '列表名.insert(索引,元素)' },
      { title: '列表元素删除', code: '列表名.remove(数据值)' },
      { title: '列表元素排序', code: '列表名.sort()' },
      { title: '列表元素反转', code: '列表名.reverse()' },
      { title: '列表元素删除最后一位', code: '变量名.pop()' },
      { title: '列表元素删除所有元素', code: '列表名.clear()' },
      { title: '列表切片', code: '列表名[开始索引:结束索引]' },
      { title: '切片步长', code: '列表名[开始索引:结束索引:步长]' }
    ]
  }
]
