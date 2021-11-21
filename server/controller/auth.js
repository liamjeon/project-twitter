import express from 'express';
import * as authRepository from '../data/auth.js';

export async function signup(req, res){
    const {usernmae, password, name, email, url} = req.body;
    const user = await authRepository.signup(usernmae, password, name, email, url);
    res.status(201).json(user);
}

export async function login(req, res){

}