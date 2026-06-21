const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/umesh', async (req, res) => {
   const response = await fetch("https://api.github.com/users/UMESHRATHOD16")
   const u = await response.json()

   res.send(`<h2>No of followers : ${u.followers}</h2>`)
})
app.get('/hithesh', (req,res)=>{
  res.send('<h2>This course is taught by hithesh choudary | chai aur code')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
