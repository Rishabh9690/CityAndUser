const express= require('express');
const CityModel= require('../models/CityModel');
const userModel= require('../models/userModel');
const mongoose= require('mongoose');
const axios= require('axios');

const isValid= function(value)
{
    if(typeof (value)=== 'undefined' || value==='null') return false;
    if(typeof (value)==='string' && value.trim().length==0) return false;
    return true;
}
const isAlphabetic= function(value)
{
    return /^[a-zA-Z]*$/.test(value);
}
const isNumericOrSpecialChar= function(value)
{
    return /[0-9!@#$%^&*<>?]/.test(value);
}
const isMobileValid= function(value)
{
    return /[0-9]/.test(value);
}
const isUrlValid= function(value)
{
    return /^[https]:/.test(value);
}


const createCity= async function (req, res)
{
    try
    {
        const cityName= req.body(data);
        //Validations
        if(!isValid(cityName)) return res.status(400).send({status: false, message: "Please provide the name of the city"});
        if(!isAlphabetic(cityName)) return res.status(400).send({status: false, message: "Please enter alphabets for the name of the city"});
        if(isNumericOrSpecialChar(cityName)) return res.status(400).send({status: false, message: "Do not enter the number of any special char in the name of City"});
        const isCityUnique= await CityModel.findOne({cityName: cityName, isDeleted: false});
        if(isCityUnique) return res.status(400).send({status: false, message: "This city is already exist"});

        const cityCreate= await CityModel.create(cityName);
        res.status(201).send({status: true, message: cityCreate});

    }
    catch(err)
    {
        console.log(err);
        res.send({error: err})
    }
}

const getCities= async function(req, res)
{
    try
    {
        const allData= await CityModel.find({isDeleted: false});
        res.status(200).send({status: true, message: allData});

    }
    catch(err)
    {
        console.log(err);
        res.send({error: err})
    }
}

const createUser= async function(req, res)
{
    try
    {
        const user= req.body(data);
        const name= user.Name;
        const city= user.City;
        const mobile= user.Mobile;
        const mediaUrl= user.url;
        if(!isValid(name)) return res.status(400).send({status: false, message: "Please provide a Valid Name"});
        if(!isAlphabetic(name)) return res.status(400).send({status: false, message: "Please enter alphabets for the Name"});
        if(isNumericOrSpecialChar(name)) return res.status(400).send({status: false, message: "Do not enter the number of any special char in the Name"});
        if(!isValid(city)) return res.status(400).send({status: false, message: "Please provide a Valid City name"});
        const findCity= await CityModel.findOne({cityName: city, isDeleted: false});
        if(!findCity) return res.status(400).send({status: false, message: "Please provide a Valid City name which is present in DataBase"});
        if(mobile)
        {
            if(!(typeof(mobile)==='number' && isMobileValid(mobile))) return res.status(400).send({status: false, message: "Please provide a Valid Mobile number"});
        }
        if(mediaUrl)
        {
            if(!(typeof(mediaUrl)==='string' && isUrlValid(mediaUrl))) return res.status(400).send({status: false, message: "Please provide a Valid Url"});
        }

        const Id= findId();
        const findId= function()
        {
            axios.get('https://api.binance.com/api/v1/time').then(response=>{
            console.log(response.data.url);
            console.log(response.data.explanation);
            return response.data.explanation;
            }).catch(err=>{console.log(err)});
        }

        user.Id= Id;
        const createdUser= await userModel.create(user);
        res.status(201).send({status: true, message: createdUser});
    }
    catch(err)
    {
        console.log(err);
        res.send({error: err})
    }
}
const getUser= async function(req, res)
{
    try
    {
        const allData= await userModel.find({isDeleted: false});
        res.status(200).send({status: true, message: allData});

    }
    catch(err)
    {
        console.log(err);
        res.send({error: err})
    }
}

const updateById= async function(req, res)
{
    try
    {
        const data= req.body;
        const Id= req.params.Id;
        if(data.Name)
        {
            if(!isValid(Name)) return res.status(400).send({status: false, message: "To update please provide a Valid Name"});
            if(!isAlphabetic(Name)) return res.status(400).send({status: false, message: "To update please enter alphabets for the Name"});
            if(isNumericOrSpecialChar(Name)) return res.status(400).send({status: false, message: " To update please do not enter the number of any special char in the Name"});
        }
        if(data.City)
        {
            if(!isValid(city)) return res.status(400).send({status: false, message: "To update please provide a Valid City name"});
            const findCity= await CityModel.findOne({cityName: city, isDeleted: false});
            if(!findCity) return res.status(400).send({status: false, message: "To update please provide a Valid City name which is present in DataBase"});
        }
        if(data.Mobile)
        {
            if(!(typeof(mobile)==='number' && isMobileValid(mobile))) return res.status(400).send({status: false, message: "To update please provide a Valid Mobile number"});
        }
        if(data.url)
        {
            if(!(typeof(mediaUrl)==='string' && isUrlValid(mediaUrl))) return res.status(400).send({status: false, message: "To update please provide a Valid Url"});
        }
        if(data.Id) return res.status(400).send({status: false, message: "Id can not be updated"});

        const searchId= await userModel.findOne({Id: Id, isDeleted: false});
        if(!searchId)  return res.status(400).send({status: false, message: "To update please provide the existing Id"});

        const updatedData= await userModel.findOneAndUpdate({Id: Id, isDeleted: false}, {...data}, {new: true});
        res.status(200).send({status: true, message: "DataUpdated", data: updatedData});
    }
    catch(err)
    {
        console.log(err);
        res.send({error: err})
    }
}



module.exports.createCity= createCity;
module.exports.getCities= getCities;
module.exports.createUser= createUser;
module.exports.getUser= getUser;
module.exports.updateById= updateById;