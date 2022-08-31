import express from 'express';
const app = express()
const port = 3355

app.use(express.static('dist'))

app.listen(port,() => {
  console.log(`Server is running on port ${port}`)
});