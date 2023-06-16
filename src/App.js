import { useState } from 'react';
import './App.css';
import React from 'react';


function App() {

  // const [글제목들, set글제목들] = useState(['남자코트 추천', '강남 우동 맛집', '리액트 기초 배우기'])
  const [따봉, set따봉] = useState([0, 0, 0]) ;
  const [modal, setModal] = useState(false)
  const [articleIndex, setArticleIndex] = useState(0)
  const [input, setInput] = useState('')
  // const [date, setDate] = useState(['2023/05/13 17:22', '2022/9/28 17:22', '2023/12/22 17:22'])
  const [articles, setArticles] = useState(
    [
      {
        title : '남자코트 추천',
        date : '2023/05/13 17:22'
      },
      {
        title : '강남 우동 맛집',
        date : '2022/9/28 17:22'
      },
      {
        title : '리액트 기초 배우기',
        date : '2023/12/22 17:22'
      }
    ]
  )

  function like(idx) {
    const copy = [...따봉]
    copy[idx] += 1
    set따봉( copy )
  }
  function changeName() {
    // console.log(articles)
    const copy = [...articles]
    copy[0].title = '여자코트 추천'
    setArticles(copy)
  }
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
        <h4>React Blog</h4>
      </div>

      {/* <button onClick={ sortArrary }>가나다라정렬</button> */}

      <button onClick={ changeName }> 글 수정</button>

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
              }}>삭제</button>
            </div>
          )
        })
      }
      {
        modal === true ? 
        <Modal 
        articles={articles}
        changeName={changeName}
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
  

  return (
    <div className='modal'>
      <h4>{articles.title }</h4>
      <p> {articles.date} </p>
      <p>상세내용</p>
      <button onClick={()=> { props.changeName() }}>글 수정</button>
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
