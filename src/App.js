import { useState, useEffect } from 'react';
import './App.css';
import React from 'react';


function App() {

  // const [글제목들, set글제목들] = useState(['남자코트 추천', '강남 우동 맛집', '리액트 기초 배우기'])
  const [따봉, set따봉] = useState([]) ;
  const [modal, setModal] = useState(false)
  const [articleIndex, setArticleIndex] = useState(0)
  const [input, setInput] = useState('')
  // const [date, setDate] = useState(['2023/05/13 17:22', '2022/9/28 17:22', '2023/12/22 17:22'])
  const [articles, setArticles] = useState(
    [
      // {
      //   title : '남자코트 추천',
      //   date : '2023/05/13 17:22'
      // },
      // {
      //   title : '강남 우동 맛집',
      //   date : '2022/9/28 17:22'
      // },
      // {
      //   title : '리액트 기초 배우기',
      //   date : '2023/12/22 17:22'
      // }
    ]
  )

  useEffect(() => {
    const savedArticles = localStorage.getItem('articles');
    const savedLikes = localStorage.getItem('likes');
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles));
    }
    if (savedLikes) {
      set따봉(JSON.parse(savedLikes));
    }
  }, []);

  // 게시글과 따봉 Local Storage에 저장하기
  useEffect(() => {
    localStorage.setItem('articles', JSON.stringify(articles));
    localStorage.setItem('likes', JSON.stringify(따봉));
  }, [articles, 따봉]);

  function like(idx) {
    const copy = [...따봉]
    copy[idx] += 1
    set따봉( copy )
  }

  // function changeName() {
  //   console.log(articles)
  //   const copy = [...articles]
  //   copy[0].title = '여자코트 추천'
  //   setArticles(copy)
  // }
  // function sortArrary() {
  //   let copy = [...articles]
  //   copy.sort()
  //   setArticles(copy)
  // }
  function toggleModal() {
    setModal(!modal)
  }

  return (
    <div className="App">
      <div className='black-nav'>
        <h4>HI 난 메모장이야</h4>
      </div>

      <div>
        <h4> 여기다 메모를 적으세요
          <br />
          (주의)사라져도 책임 안짐ㅋㅋ
          
          </h4>
      </div>

      {/* <button onClick={ sortArrary }>가나다라정렬</button> */}

      {/* <button onClick={ changeName }> 글 수정</button> */}

      {
        articles.map((article, idx)=> {
          return (
            <div className='list' key={idx}>
              <p>{idx} 번째 글</p>
              <h4 onClick={ ()=> {
                toggleModal() 
                setArticleIndex(idx)
                }
              }>
              { article.title }
                <span onClick={ (e) => {e.stopPropagation(); like(idx);} }>🍬</span> { 따봉[idx] }
              </h4>
              <p>{ article.date}</p>
              <button onClick={()=>{
                const copy = [...articles]
                copy.splice(idx, 1)
                setArticles(copy)

                const copyLikes = [...따봉]
                copyLikes.splice(idx, 1)
                set따봉(copyLikes)
              }}>삭제</button>
            </div>
          )
        })
      }
      {
        modal === true ? 
        <Modal 
        articles={articles}
        // changeName={changeName}
        articleIndex={articleIndex}
        /> : null
      }

      <input 
      type='text'
      value={input}
      onChange={(e)=>{setInput(e.target.value)}}
      />

      <button
      onClick={()=>{
        if (input.trim() === '') {
          window.alert('글을 입력하세요~')
          return
        }
        
        const copy = [...articles]
        const today = new Date()
        const year = today.getFullYear()
        const month = today.getMonth() + 1
        const date = today.getDate()
        const hours = today.getHours()
        const minutes = today.getMinutes()

        const todayDate = (year + '/' + month + '/' + date + ' ' + hours + ':' + minutes) 
        copy.unshift(
          {
            title: input,
            date: todayDate
          }
        )
        // copy.unshift(input)
        setArticles(copy)


        const copyLikes = [...따봉]
        copyLikes.unshift(0)
        set따봉(copyLikes)
        setInput('')
      }}
      >글발행</button>

      {/* <Modal2/> */}
    </div>
  )
}

function Modal(props) {

  
  const articles = props.articles[props.articleIndex]
  
  if (articles.length === 0) {
    return null
  }
  
  return (
    <div className='modal'>
      <h4>{articles.title }</h4>
      <p> {articles.date} </p>
      <p>상세내용</p>
      {/* <button onClick={()=> { props.changeName() }}>글 수정</button> */}
    </div>
  )
}


// 옛날 class 문법
// class Modal2 extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       name : 'kim',
//       age : 20
//     }
//   }
//   render() {
//     return (
//       <div>안녕 {this.state.age} 짤 {this.state.name}
//         <button onClick={() => {
//           this.setState({age: 21})
//         }}> 한살 업</button>
//       </div>
//     )
//   }
// }

export default App;
