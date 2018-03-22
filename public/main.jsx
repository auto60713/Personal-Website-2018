//準備欄位們的陣列,  讓後端倒入資料
let profile = [];
let p_name;
let p_skills;
let p_language;
let p_libraries;
let p_tools;

let projects;
let projects_set = [];



class PersonList extends React.Component {

  //保留變數state, 每當state改變, DOM會被重繪
  //於是設定trigger來當作信號
  state = {

    trigger: 0
  }

  componentDidMount() {

    document.title = "Ozen himself 2018";

    //axios.then裡面讀不到this
    let self = this;

    //axios是AJAX函式庫, 用get來獲取資料
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

        p_name = profile.c_name+" ("+profile.e_name+")";
        p_skills    = setCollection(profile.skills);
        p_language  = setCollection(profile.language);
        p_libraries = setCollection(profile.libraries);
        p_tools     = setCollection(profile.tools);
   
        projects = pj.data.projects;     

        //用迴圈將Component push進array
        for (let i = 0; i < projects.length; i += 1) {

          projects_set.push(<ProjectsCom key={projects[i].name} name={projects[i].name} dep={projects[i].depiction} url={projects[i].url}/>);         
        };

        //資料被倒入後, 用setState()改變trigger, 觸發DOM重繪, 亦在前端呈現資料
        self.setState({ trigger:1 });
    }));


  } //componentDidMount end



  //主架構
  render() {

    return (
      <div className="page-body">
      <div className="menu_box">
         <ul className="menu">
           <li><a href="#profile">Profile</a></li>
           <li><a href="#projects">Works</a></li>
         </ul>
      </div>
     
      <h1 className="title">Profile</h1>    
      <table className="profile_box">
        <tbody>
          <ProfileCom left="Name" right={p_name}/>
          <ProfileCom left="Age" right={profile.age}/>
          <ProfileCom left="E-mail" right={profile.mail}/>
          <ProfileCom left="Skills" right={p_skills}/>
          <ProfileCom left="Language" right={p_language}/>
          <ProfileCom left="Libraries" right={p_libraries}/>
          <ProfileCom left="Tools" right={p_tools}/>
        </tbody>
      </table>

      <h1 className="title">Works</h1>
      <div className="projects_box">
          {projects_set}
      </div>
      </div>
    );
  }
}

//json格式中會有array, 轉換成jsx物件
function setCollection(array) {

	let items = array.map( (it) => <div key={it}> {it} </div> );

  return items;
}

//react設定物件
const ProfileCom = props => <tr><td>{props.left}</td><td>{props.right}</td></tr>;
const ProjectsCom = props => <div><a href={props.url} target="_blank"><span>{props.name}</span><br/></a><p>{props.dep}</p></div>;



ReactDOM.render(
  <PersonList/ >,
  document.getElementById('root')
);
