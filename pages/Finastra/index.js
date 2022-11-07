import Head from 'next/head'
import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Home = () => {
    const [post, setPost] = useState([])
    const [course, setCourse] = useState([])
    const [query, setQuery] = useState("")
    const [data, setData] = useState([])
    const [displayData, setDisplayData] = useState([])


    useEffect(()=>{
       getName()
       getCourse()
      }, [])
    
    useEffect(()=>{
  
        if (post.length > 0 && course.length > 0){
            var newData = []
            newData = post.map(student => {
                var seen_courses = []                
                var courses = []
                course.map( subject =>{
                  if( subject.user_id == student.id && !seen_courses.includes(`${subject.course_selection}  ${subject.semester}`)){
                      courses.push(subject)
                      seen_courses.push(`${subject.course_selection} ${subject.semester}`)
                  } 
                })  
                var newStudent = {
                    ...student, 
                    courses
                }
                return newStudent
            })
            setData(newData)
            setDisplayData(newData)
            console.log(newData)
        }
       }, [post, course])

      

      const getName = () => {
        axios.get('https://gist.githubusercontent.com/JCGonzaga01/36a8af85464d998221c71ea3eaa57225/raw/6fe851e029ee98e9ec85ceb87433ed5ed0f06e36/users.json')
        .then(res => {
          console.log(res)
          setPost(res.data)
       
        })
        
        .catch (err => {
          console.log(err)
        })
      }

      const getCourse = () => {
        axios.get('https://gist.githubusercontent.com/JCGonzaga01/9c9e3590fb23274263678b6c4bcf9963/raw/600c8281f9db7eaba959a732912eba350bf7387d/user-course-selection.json')
        .then(res => {
          console.log(res)
          setCourse(res.data)
       
        })
        
        .catch (err => {
          console.log(err)
        })
      }
  
             
      useEffect(()=>{
 
        if(query !== ''){
          search(query.toLowerCase())
        }else{
          setDisplayData(data)
        }    

       }, [query])

      const search = (searchText) => {
        var new_display_data = []
  
        data.map(student =>{
          var has_search_text = false
          Object.values(student).forEach(val => {
            console.log(val.toString().toLowerCase())
            if(typeof val == 'string' || typeof val == 'number' ){
              var compareval  = val.toString().toLowerCase()
              if(compareval.includes(searchText)){
                has_search_text = true
              }
            }
       
          });
          if(student.courses.length > 0){
            student.courses.map(subject =>{
              Object.values(subject).forEach(val => {
                if(typeof val == 'string' || typeof val == 'number' ){
                  var compareval  = val.toString().toLowerCase()
                  if(compareval.includes(searchText)){
                    has_search_text = true
                  }
                }
              });
            })
          }
        

          if(has_search_text){
            new_display_data.push(student)
          }
          
        })
        console.log(new_display_data)
        setDisplayData(new_display_data)
      
      }
   

    return (
      <div>
        <input placeholder='search' onChange={(e) => setQuery(e.target.value)}></input>
        
        <table >
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Course Name</th>
                <th>Course Selection</th>
                <th>Semester</th>
              </tr>
               
         {displayData.length > 0 ? displayData.map(student => {
            {console.log(displayData)}
            if(student.courses.length > 0){
              var display_these = []
              for (let i = 0; i <= student.courses.length; i++) {
                console.log(i)
                if(i == 0){
                  var dis = (
                    <tr key={student.id}>
                    <td>{student.name} </td>
                    <td> {student.phone} </td>
                    <td>{student.email}</td>
                 
                  </tr>
                  )
                  display_these.push(dis)
                }else{
                  console.clear(student.courses[i-1])
                  var dis = (
                  <tr key={`${student.id} - ${student.courses[i-1].id}}`}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{student.courses[i-1].course_name}</td>
                    <td>{student.courses[i-1].course_selection}</td>
                    <td>{student.courses[i-1].semester}</td>
                  </tr>
                  )
                  display_these.push(dis)
                }
               
              }
              return(display_these)

            }else{
              return(
                <tr key={student.id}>
                <td>{student.name} </td>
                <td> {student.phone} </td>
                <td>{student.email}</td>
                <td>no data</td>
              </tr>
              )
        
          
            }

          }) : <span> no data</span>
        }
        
         </table>
          
        
      </div>
    )
  }

  export default Home

