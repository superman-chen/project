import Vue from 'vue'
import Vuex from 'vuex'
import persist from 'vuex-persist'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list:[],
    user:'',
    token:'',
    focusTeacher:[],
    isFocus:false,
  },
  mutations: {
    //关注，传入老师id如果focusTeacher数组为空首先添加，如果不为空，进行循环查找，
    //如果有该id代表已关注,移除关注数组，否则添加进关注数组,并改变关注状态
    changeFocus(state,val){
      if(state.focusTeacher.length ===0){
        state.focusTeacher.push(val)
        state.isFocus = false
      }else{
        state.focusTeacher.forEach((item,index)=>{
          if(item.id ===val.id){
            state.focusTeacher.splice(index,1)
            state.isFocus = true
          }else{
            state.focusTeacher.push(val)
            state.isFocus = false
          }
        })
      }
      
      }
      
    
  },
  actions: {
  },
  modules: {
  },
  plugins:[
    new persist({
      storage:window.localStorage
    }).plugin
  ]
})
