import Mock from "mockjs"
import Axios from "axios"



const mock = new Mock.mock("/userList", {
  "userList|10-20": [
    {
      "id|+1": 1,
      'name': "@cname",
      'age': "@integer(20, 35)",
      'email': '@email',
      'birthday': "@date",
      'city': "@city",
      'gender': "@integer(0, 1)",
      'married': "@boolean",
      'faceImg': '@image(100x100, #f00, simba)'
    }
  ]
})

const instance = Axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000
})

const mockRes = instance({url: "/userList"})

export const mcokjs = {
  mock,
  mockRes
}

