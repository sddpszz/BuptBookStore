// pages/my/mySetting/mySetting.js
var Bmob = require('../../../utils/bmob.js');
Page({
  data: {
    userWechat: '',
    userQQ: '',
    userPhone: '',
    userUniversity: '',
    userCollege: '',
    userEducation: '',
    userEntryYear: '',
    buttonLoading: false,
    university: [" ", "北京邮电大学"],
    universityIndex: 0,
    college: [" ", "信息与通信工程学院", "经济管理学院", "计算机学院", "自动化学院", "人文学院", "理学院", "国际学院"],
    collegeIndex: 0,
    education: [" ", "本科生", "硕士研究生", "博士研究生"],
    educationIndex: 0,
    entryYear: [" ", "2014", "2015", "2016", "2017", "2018"],
    entryYearIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    this.setData({
      userUniversity: this.data.university[0],
      userCollege: this.data.college[0],
      userEducation: this.data.education[0],
      userEntryYear: this.data.entryYear[0],
      userWechat: '',
      userQQ: '',
      userPhone: ''
    })
    var User = Bmob.Object.extend("_User");
    var query = new Bmob.Query(User);
    query.get(Bmob.User.current().id, {
      success: function (result) {
        console.log('修改前',result)
        if (result.get("university")) {
          that.setData({
            userUniversity: result.get("university"),
            universityIndex: that.data.university.indexOf(that.data.userUniversity)
          })
        }
        if (result.get("college")) {
          that.setData({
            userCollege: result.get("college"),
            collegeIndex: that.data.college.indexOf(that.data.userCollege)
          })
        }
        if (result.get("education")) {
          that.setData({
            userEducation: result.get("education"),
            educationIndex: that.data.education.indexOf(that.data.userEducation)
          })
        }
        if (result.get("entryYear")) {
          that.setData({
            userEntryYear: result.get("entryYear"),
            entryYearIndex: that.data.entryYear.indexOf(that.data.userEntryYear)
          })
        }
        if (result.get("wechatId")) {
          that.setData({
            userWechat: result.get("wechatId")
          })
        }
        if (result.get("QQ")) {
          that.setData({
            userQQ: result.get("QQ")
          })
        }
        if (result.get("mobilePhoneNumber")) {
          that.setData({
            userPhone: result.get("mobilePhoneNumber")
          })
        }

        console.log(that.data)
      },
      error: function (object, error) {
        console.log('查询失败', error)
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  bindUniversityChange: function (e) {
    this.setData({
      universityIndex: e.detail.value,
      userUniversity: this.data.university[this.data.universityIndex]
    })
  },

  bindCollegeChange: function (e) {
    this.setData({
      collegeIndex: e.detail.value,
      userCollege: this.data.college[this.data.collegeIndex]
    })
  },
  bindEducationChange: function (e) {
    this.setData({
      educationIndex: e.detail.value,
      userEducation: this.data.education[this.data.educationIndex]
    })
  },
  bindEntryYearChange: function (e) {
    this.setData({
      entryYearIndex: e.detail.value,
      userEntryYear: this.data.entryYear[this.data.entryYearIndex]
    })
  },
  bindWechatInput: function (e) {
    this.setData({
      userWechat: e.detail.value
    })
  },
  bindQQInput: function (e) {
    this.setData({
      userQQ: e.detail.value
    })
  },
  bindPhoneInput: function (e) {
    this.setData({
      userPhone: e.detail.value
    })
  },
  bindSubmit: function () {
    var that = this;
    this.setData({
      buttonLoading: true
    })
    var User = Bmob.Object.extend("_User");
    var query = new Bmob.Query(User);
    query.get(Bmob.User.current().id, {
      success: function (result) {
        console.log('点击按钮',result)
        result.set("wechatId", that.data.userWechat);
        result.set("QQ", that.data.userQQ);
        result.set("mobilePhoneNumber", that.data.userPhone);
        result.set("university", that.data.userUniversity);
        result.set("college", that.data.userCollege);
        result.set("education", that.data.userEducation);
        result.set("entryYear", that.data.userEntryYear);
        result.save();
        that.setData({
          buttonLoading: false
        });
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 3000
        })
      },
      error: function (object, error) {
        console.log('失败', object, error)
      }
    })
  }
})