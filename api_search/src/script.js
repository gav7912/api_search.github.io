   const apiUrl = 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json';

    const App = {
      data() {
        return {
          allData: [], // 定義 allData 來存放 API 獲取的數據
          datastore: {}, // 將會綁定到 selected radio button
          search:'',
          caches:[],
          changeDatastore:{}
        };
      },
      mounted() {
        axios.get(apiUrl).then((res) => {
          this.allData = res.data.result.records; // 確保 allData 被 API 返回的數據填充
        }).catch((error) => {
          console.error('Error fetching data:', error);
        });
      },
      computed:{
        filterData(){
          return this.allData.filter(item=>{
            if(this.search===""){
              return this.allData
              }else{
                return item.Name.match(this.search)
              }
           
          })
        }
      },
      watch:{
        datastore(newVal, oldVal) {
          // 假設您希望每次選擇都添加瀏覽紀錄
          if (newVal && !this.caches.some(cache => cache.Name === newVal.Name)) {
            if(this.caches.length>=5){
              this.caches.shift()
            }
            this.caches.unshift(newVal);
          }
        }
      },
      methods:{
        change(){
          if(!this.caches==[]){
            this.datastore=this.changeDatastore
          }
        }
      }

    };

    Vue.createApp(App).mount('#app');