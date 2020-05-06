const express = require('express')
const bodyParser = require('body-parser')
const cors =  require('cors')


const app =  express()
const port = 3000

let students = [{
    "studentID": "1",
    "studentName": "Alex",
    "studentGrade": "A",
    "Address": "Chennai",
    "PhoneNumber": "9898789677"
},

{
    "studentID": "2",
    "studentName": "John",
    "studentGrade": "B",
    "Address": "Chennai",
    "PhoneNumber": "98978677"
},

{
    "studentID": "3",
    "studentName": "Max",
    "studentGrade": "C",
    "Address": "Chennai",
    "PhoneNumber": "9875656677"
},
{
    "studentID": "4",
    "studentName": "Tom",
    "studentGrade": "A",
    "Address": "Chennai",
    "PhoneNumber": "98785777"
}]

app.use(cors())

app.use(bodyParser.urlencoded({ extends: false}))

app.use(bodyParser.json())

app.get('/student', (req, res)=>{
    res.json(students)
})

app.post('/student', (req,res)=>{
    const student = req.body

    students.push(student)
    
    console.log(student)

    res.send("Student is added to the database")
})


app.get('/student/:studentID', (req,res)=>{

    const studentID = req.params.studentID

    for(let student of students){
        if(student.studentID === studentID){
            res.json(student)
        }
    }

    res.status(404).send('Student not found')


})


app.put('/student/:studentID', (req, res)=>{
    const studentID = req.params.studentID
    const newStudent = req.body 


    for(let i = 0; i<students.length; i++){
        let student = students[i]

        if(student.studentID == studentID){
            students[i] = newStudent
        }
    }

    res.send('Student detail is edited')
})




app.delete('/student/:studentID', (req, res)=>{
    const studentID = req.params.studentID

    students = students.filter(i =>{
        if(i.studentID !== studentID){
            return true
        }
        return false
    })

    res.send('Student is deleted')
})

app.listen(3000, ()=>{
    console.log(`Hello world listening on port ${port}!`)

})

