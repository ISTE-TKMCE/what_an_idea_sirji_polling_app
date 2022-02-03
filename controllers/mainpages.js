const bcrypt=require('bcryptjs')
const { redirect } = require('express/lib/response')
var Team=require('../models/model')
exports.mainpage=(req,res,next)=>{
    const isLoggedIn= req.session.isLoggedIn===true
    if(isLoggedIn){
        const name= req.session.name
        Team.findAll({where: {name: name}}).then((team)=>{
            
            req.session.votebalance=team[0].votebalance
            
            res.render('homepage',{pagetitle: 'Homepage',Teamname:  req.session.name,isAuthenticated: isLoggedIn, votesbalance: req.session.votebalance})

    }).catch((err)=>console.log(err))
    }
    else{
        res.render('homenew',{pagetitle: 'Homepage',isAuthenticated: isLoggedIn})
    }
    }
exports.vote1=(req,res,next)=>{
    
    const name= req.session.name 
    if(req.session.isLoggedIn===true ){
    Team.findAll({where: {name: name}}).then((team)=>{
        if(team[0].votebalance>0){
        team[0].votebalance-=1
        
        team[0].save()
        }
        else{
            res.redirect('/')
        }
    }).catch((err)=>console.log(err))
    Team.findAll({where: {name: 'Team1'}}).then((team)=>{
        team[0].votes+=1
        team[0].save()
    }).catch((err)=>console.log(err))
    res.redirect('/')
    }
    else{
        res.redirect('/')
    }
}
exports.vote2=(req,res,next)=>{
    const name= req.session.name 
    if(req.session.isLoggedIn===true ){
    Team.findAll({where: {name: name}}).then((team)=>{
        if(team[0].votebalance>0){
        team[0].votebalance-=1
        
        team[0].save()
        }
        else{
            res.redirect('/')
        }
    }).catch((err)=>console.log(err))
    Team.findAll({where: {name: 'Team2'}}).then((team)=>{
        team[0].votes+=1
        team[0].save()
    }).catch((err)=>console.log(err))
    res.redirect('/')
    }
    else{
        res.redirect('/')
    }
}
exports.vote3=(req,res,next)=>{
    
    const name= req.session.name 
    if(req.session.isLoggedIn===true ){
    Team.findAll({where: {name: name}}).then((team)=>{
        if(team[0].votebalance>0){
        team[0].votebalance-=1
        
        team[0].save()
        }
        else{
            res.redirect('/')
        }
    }).catch((err)=>console.log(err))
    Team.findAll({where: {name: 'Team3'}}).then((team)=>{
        team[0].votes+=1
        team[0].save()
    }).catch((err)=>console.log(err))
    res.redirect('/')
    }
    else{
        res.redirect('/')
    }
}
exports.vote4=(req,res,next)=>{
    
    const name= req.session.name 
    if(req.session.isLoggedIn===true ){
    Team.findAll({where: {name: name}}).then((team)=>{
        if(team[0].votebalance>0){
        team[0].votebalance-=1
        
        team[0].save()
        }
        else{
            res.redirect('/')
        }
    }).catch((err)=>console.log(err))
    Team.findAll({where: {name: 'Team4'}}).then((team)=>{
        team[0].votes+=1
        team[0].save()
    }).catch((err)=>console.log(err))
    res.redirect('/')
    }
    else{
        res.redirect('/')
    }
}



exports.store=async (req,res,next)=>{
    
    const {username, password, votebalance, votes}= req.body
    let hashpass=await bcrypt.hash(password, 8)
    
    Team.create({
        name: username,
        
        password: hashpass,
        votebalance: votebalance,
        votes: votes
    }).then().catch(err=>{
        console.log(err)
    })
    res.redirect('/')
}
exports.logincontro=(req,res,next)=>{
    passnomatch=false
    username=req.body.name
    password=req.body.password
    
    Team.findAll({where: {name: username}}).then(async (team)=>{
        
        if(team[0]!=null){
        bcrypt.compare(password, team[0].password).then((result)=>{
            
            if(result) {
                req.session.isLoggedIn=true
                req.session.name=team[0].name
                req.session.votebalance= team[0].votebalance
                
                return res.redirect('/')
            }
            else{
                const isLoggedIn= req.session.isLoggedIn===true
                passnomatch=true
                res.render('login',{pagetitle: 'Login', name: 'loginpage', isAuthenticated: isLoggedIn, passnomatch: passnomatch})
            }
        })
        }
        else{
            passnomatch=true
            const isLoggedIn= req.session.isLoggedIn===true
            res.render('login',{pagetitle: 'Login', name: 'loginpage', isAuthenticated: isLoggedIn, passnomatch: passnomatch})
        }
    
   
    
    
    
    }).catch((err)=>console.log(err))}
    
    
       
    

