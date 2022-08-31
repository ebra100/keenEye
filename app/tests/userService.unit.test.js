const { test, expect } = require("@jest/globals");
const userService = require("../services/UserService");
const AuthService = require("../services/AuthService");
const { User } = require("../models/User");


test("test the register result function", async () => {

    let rand = parseInt((Math.random() * 1000))

    let input = {
        "username": `test${rand}`,
        "email": `test${rand}`,
        "name": "test",
        "password": "test"
    }


    User.create = jest.fn().mockImplementation(() => Promise.resolve({
        "_id": "test",
        "username": `test${rand}`,
        "email": `test${rand}`,
        "name": "test",
        "password": "test"
    }));

    let result = await userService.register(input);
    console.log(result)

    expect(result.createdUser).toEqual({
        "_id": "test",
        "username": `test${rand}`,
        "email": `test${rand}`,
        "name": "test",
        "password": "test"
    })

    expect(result).toHaveProperty("token")
    expect(result).toHaveProperty("refreshToken")
})

test("test the login result function", async () => {

    let rand = parseInt((Math.random() * 1000))

    let input = {
        "username": `test${rand}`,
        "password": "test"
    }


    User.findOne = jest.fn().mockImplementation(() => Promise.resolve({
        "_id": "test",
        "username": `test${rand}`,
        "email": `test${rand}`,
        "name": "test",
        "password": "test"
    }));

    AuthService.comparePassword = jest.fn().mockImplementation(() => Promise.resolve(true))

    let result = await userService.login(input);
    console.log(result)

    expect(result.user).toEqual({
        "_id": "test",
        "username": `test${rand}`,
        "email": `test${rand}`,
        "name": "test",
        "password": "test"
    })

    expect(result).toHaveProperty("token")
    expect(result).toHaveProperty("refreshToken")
})
