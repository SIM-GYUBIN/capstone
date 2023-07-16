const express = require("express");
const router = express.Router();
const path = require("path");
const req = require('http');
const res = require('express');
const connection = require('../config/mysql');
const main = require('../controllers/main');
const login = require('../controllers/login')
const signup = require("../controllers/signup");
const match = require("../controllers/match");

const { cookieJwtAuth } = require('../middleware/cookieJwtAuth');
const { uploadMiddleware } = require('../middleware/uploadMiddleware');



//ejs 파일들 연결 페이지
router.get('/', cookieJwtAuth,main.mainview);
router.get('/match/:id', cookieJwtAuth,main.matchview);
router.get('/match-list',cookieJwtAuth, main.match_listview);
router.get('/match-making', cookieJwtAuth,main.match_makingview);
router.get('/noMatch',cookieJwtAuth, main.noMatchview);
router.get('/matched', cookieJwtAuth,main.matchedview);
router.get('/signin',cookieJwtAuth, main.signinview)
router.get('/signup',cookieJwtAuth, main.signupview);
router.get('/confirm-place',cookieJwtAuth, main.confirm_placeview);
router.get('/my-match', cookieJwtAuth,main.my_matchview);
router.get('/team-info', cookieJwtAuth,main.team_infoview);
router.get('/edit-team', cookieJwtAuth,main.edit_teamview);
router.get('/edit-match', cookieJwtAuth,main.edit_matchview);
//후기 작성
router.get('/team-review', cookieJwtAuth,main.team_reviewview);
//등록한 경기 정보
router.get('/registered-match', cookieJwtAuth,main.registered_matchview);
router.get('/requested-match', cookieJwtAuth,main.requested_matchview);
//test page
router.get('/maptest', cookieJwtAuth,main.maptestview);
router.post('/upload', uploadMiddleware ,(req, res) => {
    console.log(req);
    console.log(req.file);
    res.redirect('/maptest');
});


router.post('/tomain', cookieJwtAuth,main.tomain);
router.post('/login',login.login_process);
router.post('/logout',login.logout);
router.post('/signup', uploadMiddleware,signup.signup);
router.post('/edit-team', cookieJwtAuth,login.edit_team);
router.post('/team-review', cookieJwtAuth,login.team_review);
router.post('/match-making', cookieJwtAuth,match.match_making);
router.post('/request', cookieJwtAuth,match.match_request);
router.post('/confirm-place', cookieJwtAuth,match.insertMatch);
router.post('/match-accept', cookieJwtAuth,match.match_accept);
router.post('/match-reject', cookieJwtAuth,match.match_reject);


module.exports = router;
