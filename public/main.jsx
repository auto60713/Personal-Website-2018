//準備欄位們的陣列,  讓後端倒入資料
let profile = [];

let p_skills;
let p_languages;
let p_libraries;
let p_tools;

let projects;
let projects_set = [];


class Page extends React.Component {

  //保留變數state, 每當state改變, DOM會被重繪
  //於是設定trigger來當作信號
  state = {

    trigger: 0
  }

  componentDidMount() {

    //axios.then裡面讀不到this
    let self = this;

    //axios是AJAX函式庫, 用get來獲取資料, 資料來源請找app.js
    function getProfile() {
      return axios.get('/data');
    }
    function getProjects() {
      return axios.get('/data2');
    }

    //Performing multiple concurrent requests
    axios.all([getProfile(), getProjects()])
    .then(axios.spread(function (pf, pj) {

        profile = pf.data;
 
        p_skills    = AryToDiv(profile.skills);
        p_languages = AryToDiv(profile.languages);
        p_libraries = AryToDiv(profile.libraries);
        p_tools     = AryToDiv(profile.tools);

        projects = pj.data.projects;     

        //用迴圈將Component push進array
        for (let i = 0; i < projects.length; i += 1) {

          projects_set.push(<ProjectsCom key={projects[i].name} index={"img/"+i+".PNG"} name={projects[i].name} dep={projects[i].depiction} url={projects[i].url}/>);         
        };

        //資料被倒入後, 用setState()改變trigger, 觸發DOM重繪, 亦在前端呈現資料
        self.setState({ trigger:1 });
    }));


  } //componentDidMount end


  //主架構
  render() {

    return (
      <div id="home">

      <h1 className="BigTitle">Autoplay</h1>   
      <h1 className="SubTitle">Front-End Development, Website Art Design</h1>   

      <div id="foreword">
      <p>我的名字叫做Ozen，台灣人，專長為網頁前端設計。<br/><br/>
      小時候很喜歡玩電玩，當時有一款遊戲是開放原始碼，於是我開始嘗試去修改遊戲的程式碼，這是我人生第一次接觸到寫程式，只是當時並沒有這樣的認知，只是覺得打一些字，遊戲的內容就改變了，後來便養成了喜歡去看遊戲程式資料的習慣，這件事是我對於程式設計的啟蒙。
      <br/><br/>
      大學時開始學習網頁設計，當時的專題是網路家庭相簿，在小組裡擔任主要程式，由前端寫到後端包含資料庫的設計與建立。後來在老師的培養下參加各種比賽，使我成為了一個網頁設計師。
      <br/><br/>
      我喜歡電玩、動畫、音樂、美術和時尚，我在網頁設計會特別重視美術與使用者體驗，每當我寫出一個很酷的網站，我就會很有成就感，這也是保持我熱情的原因。現在我依然持續開發，希望未來能做出大家都覺得很有趣的網站。
      </p>
      <p>My name is Ozen, I'm Taiwanese. My specialty is Front-End Design.<br/><br/>
      I love playing video games when I was a kid. There was a game that was open source at the time. So I started trying to modify the code of the game. This is the first time I have written a program. It was only then that there was no such understanding. I just feel like typing some words, the content of the game has changed. Later I became accustomed to watching game program data. This is my initiation of programming.
      <br/><br/>
      I started learning web design at university. The topic at that time was an online family album. Cause of the training of teachers to participate in various competitions. So I became a web designer. 
      <br/><br/>
      I like video games, animation, music, art, and fashion. I pay special attention to the art and user experience in web design. Whenever I write a cool website, I have a sense of accomplishment. This is also the reason to keep my passion. Now I still continue to develop. I hope that in the future we will be able to make websites that everyone finds interesting.
      </p>
      </div>

      <table id="profile">
        <tbody>
          <TableItems left="Name" right={profile.e_name}/>
          <TableItems left="E-mail" right={profile.mail}/>
          <TableItems left="Skills" right={p_skills}/>
          <TableItems left="Language" right={p_languages}/>
          <TableItems left="Libraries" right={p_libraries}/>
          <TableItems left="Tools" right={p_tools}/>
        </tbody>
      </table>

      <div id="works">
          {projects_set}
      </div>

      <div id="copyright">
          Art Design Assistance: ZMA<br/>
          Music: Detroit Swindle - Yes No Maybe (feat. Tom Misch)
      </div>
      </div>
    );
  }
}


//json格式中會有array, 轉換成jsx物件
function AryToDiv(array) {

  let items = array.map( (it) => <div key={it}> {it} </div> );

  return items;
}

//react設定物件
const TableItems = p => <tr><td>{p.left}</td><td>{p.right}</td></tr>;
const ProjectsCom = p => <div><a href={p.url} target="_blank"><img src={p.index}/><span>{p.name}</span><br/></a><p>{p.dep}</p></div>;
//p means props


ReactDOM.render(
  <Page/ >,
  document.getElementById('root')
);
